import swaggerParser from "swagger-parser"
import TestLog from "../models/TestLog.js"
import SummaryReport from "../models/SummaryReport.js"
import { extractEndpoints, testEndpoints, generateSummary } from "../services/evaluatorService.js"
import logger from "../utils/logger.js"

export const evaluateAPI = async (req, res) => {
  try {
    const {
      oasUrl,
      baseUrl = "",
      authToken = null,
      timeout = 10000,
      retries = 3,
      methods = ["GET", "POST", "PUT", "DELETE", "PATCH"],
    } = req.body

    logger.info(`Starting API evaluation for: ${oasUrl}`)

    // Validate and parse the OAS
    const api = await swaggerParser.validate(oasUrl)
    logger.info(`Successfully parsed OAS with ${Object.keys(api.paths).length} paths`)

    // Log the API info for debugging
    logger.info(`API Info - Host: ${api.host}, BasePath: ${api.basePath}, Schemes: ${api.schemes}`)

    // Extract endpoints
    const allEndpoints = extractEndpoints(api)
    logger.info(`Extracted ${allEndpoints.length} total endpoints`)

    // Filter by requested methods
    const endpoints = allEndpoints.filter((endpoint) => methods.includes(endpoint.method))

    logger.info(`Found ${endpoints.length} endpoints to test after filtering by methods: ${methods.join(", ")}`)

    // Log first few endpoints for debugging
    endpoints.slice(0, 3).forEach((endpoint) => {
      logger.info(`Endpoint: ${endpoint.method} ${endpoint.baseUrl}${endpoint.path}`)
    })

    // Test endpoints
    const testResults = await testEndpoints(endpoints, {
      timeout,
      retries,
      baseUrl,
      authToken,
    })

    // Generate summary
    const summary = generateSummary(testResults, oasUrl)

    // Save to database
    if (testResults.logs.length > 0) {
      await TestLog.insertMany(testResults.logs)
    }
    await SummaryReport.create(summary)

    logger.info(`Evaluation completed. Success rate: ${summary.successRate}%`)

    res.json({
      success: true,
      summary,
      logs: testResults.logs,
      endpoints: endpoints.map((e) => ({ path: e.path, method: e.method, baseUrl: e.baseUrl })),
    })
  } catch (error) {
    logger.error("API evaluation failed:", error)
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}
