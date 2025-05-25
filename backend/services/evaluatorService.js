import axios from "axios"
import { generateDummyData } from "../utils/dummyData.js"
import logger from "../utils/logger.js"
import { faker } from "@faker-js/faker"

export function extractEndpoints(api) {
  const endpoints = []

  // Get base URL from servers array or construct from host/basePath (Swagger 2.0)
  let baseUrl = ""

  if (api.servers && api.servers.length > 0) {
    // OpenAPI 3.0+ format
    baseUrl = api.servers[0].url
  } else if (api.host) {
    // Swagger 2.0 format (like Petstore)
    const scheme = api.schemes && api.schemes.length > 0 ? api.schemes[0] : "https"
    const basePath = api.basePath || ""
    baseUrl = `${scheme}://${api.host}${basePath}`
  } else {
    // Fallback - extract from the OAS URL itself
    baseUrl = ""
  }

  for (const path in api.paths) {
    for (const method in api.paths[path]) {
      if (["get", "post", "put", "delete", "patch"].includes(method)) {
        const operation = api.paths[path][method]
        endpoints.push({
          path: path,
          method: method.toUpperCase(),
          parameters: operation.parameters || [],
          requestBody: operation.requestBody,
          responses: operation.responses,
          security: operation.security || api.security || [],
          baseUrl: baseUrl,
          operationId: operation.operationId,
          consumes: operation.consumes || api.consumes || ["application/json"],
          produces: operation.produces || api.produces || ["application/json"],
        })
      }
    }
  }
  return endpoints
}

export async function testEndpoints(endpoints, options = {}) {
  const { timeout = 10000, retries = 3, baseUrl = "", authToken = null } = options

  const logs = []
  const stats = {
    total: endpoints.length,
    success: 0,
    failure: 0,
    byMethod: {},
  }

  for (const endpoint of endpoints) {
    const methodStats = stats.byMethod[endpoint.method] || { total: 0, success: 0, failure: 0 }
    methodStats.total++
    stats.byMethod[endpoint.method] = methodStats

    let attempt = 0
    let success = false

    while (attempt < retries && !success) {
      attempt++
      try {
        const result = await testSingleEndpoint(endpoint, {
          timeout,
          baseUrl: baseUrl || endpoint.baseUrl,
          authToken,
          attempt,
        })

        logs.push(result)

        if (result.statusCode >= 200 && result.statusCode < 400) {
          stats.success++
          methodStats.success++
          success = true
        } else {
          if (attempt === retries) {
            stats.failure++
            methodStats.failure++
          }
        }
      } catch (error) {
        logger.error(`Attempt ${attempt} failed for ${endpoint.method} ${endpoint.path}:`, error.message)

        if (attempt === retries) {
          stats.failure++
          methodStats.failure++
          logs.push({
            endpoint: endpoint.path,
            method: endpoint.method,
            request: null,
            response: { error: error.message },
            statusCode: 0,
            timestamp: new Date(),
            attempt,
          })
        }
      }
    }
  }

  return { logs, stats }
}

async function testSingleEndpoint(endpoint, options) {
  const { timeout, baseUrl, authToken, attempt } = options

  // Construct the full URL properly
  let fullUrl = ""

  if (baseUrl) {
    // Remove trailing slash from baseUrl and leading slash from path if both exist
    const cleanBaseUrl = baseUrl.replace(/\/$/, "")
    const cleanPath = endpoint.path.startsWith("/") ? endpoint.path : "/" + endpoint.path
    fullUrl = cleanBaseUrl + cleanPath
  } else {
    // If no base URL, the path should be a full URL
    fullUrl = endpoint.path.startsWith("http") ? endpoint.path : "https://petstore.swagger.io/v2" + endpoint.path
  }

  // Handle path parameters
  const pathParams = {}
  const pathParamMatches = fullUrl.match(/{([^}]+)}/g)

  if (pathParamMatches) {
    pathParamMatches.forEach((match) => {
      const paramName = match.slice(1, -1)
      const dummyValue = generatePathParamValue(paramName, endpoint.parameters)
      pathParams[paramName] = dummyValue
      fullUrl = fullUrl.replace(match, dummyValue)
    })
  }

  // Validate URL
  try {
    new URL(fullUrl)
  } catch (urlError) {
    throw new Error(`Invalid URL constructed: ${fullUrl}`)
  }

  // Handle query parameters for GET requests
  const queryParams = {}
  if (endpoint.parameters) {
    endpoint.parameters.forEach((param) => {
      if (param.in === "query") {
        queryParams[param.name] = generateQueryParamValue(param)
      }
    })
  }

  // Build request config
  const config = {
    method: endpoint.method,
    url: fullUrl,
    timeout: timeout,
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
    headers: {
      "User-Agent": "REST-API-Evaluator/1.0",
      Accept: "application/json",
    },
    validateStatus: (status) => {
      // Don't throw for any status code, we want to capture all responses
      return true
    },
  }

  // Add authentication if provided
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  // Handle request body for POST, PUT, PATCH
  if (["POST", "PUT", "PATCH"].includes(endpoint.method)) {
    const contentType = getPreferredContentType(endpoint)

    // Handle different content types
    if (contentType.includes("multipart/form-data")) {
      await handleMultipartFormData(config, endpoint)
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      handleFormUrlEncoded(config, endpoint)
    } else {
      // Default to JSON
      handleJsonBody(config, endpoint)
    }
  }

  logger.info(`Testing ${endpoint.method} ${fullUrl} (attempt ${attempt})`)

  const startTime = Date.now()
  const response = await axios(config)
  const endTime = Date.now()

  return {
    endpoint: endpoint.path,
    method: endpoint.method,
    request: {
      url: fullUrl,
      headers: config.headers,
      data: config.data,
      params: config.params,
      pathParams: pathParams,
    },
    response: {
      data: response.data,
      headers: response.headers,
      size: JSON.stringify(response.data || {}).length,
    },
    statusCode: response.status,
    responseTime: endTime - startTime,
    timestamp: new Date(),
    attempt,
  }
}

function getPreferredContentType(endpoint) {
  // Check if endpoint has specific consumes array
  if (endpoint.consumes && endpoint.consumes.length > 0) {
    return endpoint.consumes[0]
  }

  // Check for form parameters - if present, likely expects form data
  const hasFormParams = endpoint.parameters?.some((p) => p.in === "formData")
  const hasFileParams = endpoint.parameters?.some((p) => p.type === "file")

  if (hasFileParams) {
    return "multipart/form-data"
  } else if (hasFormParams) {
    return "application/x-www-form-urlencoded"
  }

  return "application/json"
}

async function handleMultipartFormData(config, endpoint) {
  const FormData = (await import("form-data")).default
  const form = new FormData()

  // Add form parameters
  if (endpoint.parameters) {
    endpoint.parameters.forEach((param) => {
      if (param.in === "formData") {
        const value = generateFormParamValue(param)
        form.append(param.name, value)
      }
    })
  }

  config.data = form
  config.headers = { ...config.headers, ...form.getHeaders() }
}

function handleFormUrlEncoded(config, endpoint) {
  const formData = {}

  // Add form parameters
  if (endpoint.parameters) {
    endpoint.parameters.forEach((param) => {
      if (param.in === "formData") {
        formData[param.name] = generateFormParamValue(param)
      }
    })
  }

  config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  config.data = new URLSearchParams(formData).toString()
}

function handleJsonBody(config, endpoint) {
  // For Swagger 2.0, check for body parameter
  const bodyParam = endpoint.parameters?.find((p) => p.in === "body")

  if (bodyParam && bodyParam.schema) {
    config.headers["Content-Type"] = "application/json"
    const generatedData = generateDummyData(bodyParam.schema)

    // Ensure required fields are present for specific schemas
    if (bodyParam.schema.properties) {
      const enhancedData = ensureRequiredFields(generatedData, bodyParam.schema, endpoint.path)
      config.data = enhancedData
    } else {
      config.data = generatedData
    }
  } else if (endpoint.requestBody) {
    // OpenAPI 3.0+ format
    const contentType = Object.keys(endpoint.requestBody.content || {})[0]
    if (contentType) {
      const schema = endpoint.requestBody.content[contentType].schema
      config.headers["Content-Type"] = "application/json"
      const generatedData = generateDummyData(schema)
      const enhancedData = ensureRequiredFields(generatedData, schema, endpoint.path)
      config.data = enhancedData
    }
  } else {
    // Default empty body for POST/PUT/PATCH if no schema found
    config.headers["Content-Type"] = "application/json"
    config.data = {}
  }
}

function ensureRequiredFields(data, schema, endpointPath) {
  if (!data || typeof data !== "object") return data

  // Specific fixes for known endpoints
  if (endpointPath.includes("/store/order")) {
    // Ensure petId is present for store orders
    if (!data.petId) {
      data.petId = faker.helpers.arrayElement([1, 2, 3, 10, 100])
    }
    // Ensure status is present
    if (!data.status) {
      data.status = faker.helpers.arrayElement(["placed", "approved", "delivered"])
    }
  }

  // Ensure all required fields from schema are present
  if (schema.required && Array.isArray(schema.required)) {
    schema.required.forEach((requiredField) => {
      if (!(requiredField in data) && schema.properties && schema.properties[requiredField]) {
        const fieldValue = generateDummyData(schema.properties[requiredField], 0, requiredField)
        if (fieldValue !== null) {
          data[requiredField] = fieldValue
        }
      }
    })
  }

  return data
}

function generatePathParamValue(paramName, parameters = []) {
  // First, check if there's a parameter definition for this path param
  const paramDef = parameters.find((p) => p.name === paramName && p.in === "path")

  if (paramDef) {
    if (paramDef.enum) {
      return paramDef.enum[0]
    }
    if (paramDef.schema) {
      return generateDummyData(paramDef.schema, 0, paramName)
    }
    if (paramDef.type === "integer") {
      // Use a known existing ID for better success rate
      return getKnownId(paramName)
    }
    if (paramDef.type === "string") {
      // For string path parameters like username, return a proper string
      return generateStringPathParam(paramName)
    }
  }

  // Fallback to name-based generation
  const lowerName = paramName.toLowerCase()

  if (lowerName.includes("username")) {
    return "testuser" // Always use string for username
  }
  if (lowerName.includes("pet")) {
    return getKnownId(paramName)
  }
  if (lowerName.includes("order")) {
    return getKnownId(paramName)
  }
  if (lowerName.includes("user") && !lowerName.includes("username")) {
    return getKnownId(paramName)
  }
  if (lowerName.includes("id")) return getKnownId(paramName)
  if (lowerName.includes("name")) return "testuser"
  if (lowerName.includes("code")) return "ABC123"
  if (lowerName.includes("slug")) return "test-slug"
  if (lowerName.includes("status")) return "available"
  if (lowerName.includes("tag")) return "test-tag"

  return "test-value"
}

function generateStringPathParam(paramName) {
  const lowerName = paramName.toLowerCase()

  if (lowerName.includes("username")) {
    return "testuser"
  }
  if (lowerName.includes("name")) {
    return "testname"
  }

  return "test-value"
}

function getKnownId(paramName) {
  // Use known existing IDs for better success rate
  const knownIds = {
    petId: [1, 2, 3, 10, 100],
    orderId: [1, 2, 3, 10],
    userId: [1, 2, 3],
  }

  const lowerName = paramName.toLowerCase()

  if (lowerName.includes("pet")) {
    return knownIds.petId[Math.floor(Math.random() * knownIds.petId.length)]
  }
  if (lowerName.includes("order")) {
    return knownIds.orderId[Math.floor(Math.random() * knownIds.orderId.length)]
  }
  if (lowerName.includes("user")) {
    return knownIds.userId[Math.floor(Math.random() * knownIds.userId.length)]
  }

  // Default to small random number for better chance of existing
  return Math.floor(Math.random() * 10) + 1
}

function generateQueryParamValue(param) {
  if (param.enum) {
    return param.enum[0]
  }

  if (param.schema) {
    return generateDummyData(param.schema, 0, param.name)
  }

  // Handle common query parameters with realistic values
  const paramName = param.name.toLowerCase()

  if (paramName === "status") {
    return ["available", "pending", "sold"][Math.floor(Math.random() * 3)]
  }
  if (paramName === "tags") {
    return ["dog", "cat", "bird"][Math.floor(Math.random() * 3)]
  }
  if (paramName === "username") {
    return "testuser"
  }
  if (paramName === "password") {
    return "testpass123"
  }

  // Default based on type
  switch (param.type) {
    case "integer":
      return Math.floor(Math.random() * 100) + 1
    case "boolean":
      return Math.random() > 0.5
    case "array":
      return ["test1", "test2"]
    default:
      return "test-value"
  }
}

function generateFormParamValue(param) {
  if (param.type === "file") {
    return "test-file.jpg"
  }

  if (param.enum) {
    return param.enum[0]
  }

  // Handle common form parameters
  const paramName = param.name.toLowerCase()

  if (paramName === "name") return "Test Pet"
  if (paramName === "status") return "available"
  if (paramName === "additionalmetadata") return "Test metadata"

  // Default based on type
  switch (param.type) {
    case "integer":
      return Math.floor(Math.random() * 100) + 1
    case "boolean":
      return Math.random() > 0.5
    default:
      return "test-value"
  }
}

export function generateSummary(testResults, oasUrl) {
  const { logs, stats } = testResults

  return {
    oasUrl,
    totalEndpoints: stats.total,
    testedEndpoints: logs.length,
    successCount: stats.success,
    failureCount: stats.failure,
    successRate: stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(2) : 0,
    methodBreakdown: stats.byMethod,
    averageResponseTime:
      logs.length > 0 ? (logs.reduce((sum, log) => sum + (log.responseTime || 0), 0) / logs.length).toFixed(2) : 0,
    timestamp: new Date(),
  }
}
