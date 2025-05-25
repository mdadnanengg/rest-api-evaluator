import { faker } from "@faker-js/faker"

export function generateDummyData(schema, depth = 0, fieldName = "") {
  if (!schema || depth > 10) return null

  // Handle references
  if (schema.$ref) {
    // For now, return a simple object for refs
    return { id: faker.number.int({ min: 1, max: 1000 }) }
  }

  // Handle Swagger 2.0 type definitions
  const type = schema.type || (schema.properties ? "object" : "string")

  // Handle different types
  switch (type) {
    case "string":
      return generateStringValue(schema, fieldName)

    case "number":
    case "integer":
      return generateNumberValue(schema, fieldName)

    case "boolean":
      return faker.datatype.boolean()

    case "array":
      return generateArrayValue(schema, depth, fieldName)

    case "object":
      return generateObjectValue(schema, depth)

    case "file":
      // For file uploads, return a simple string
      return "test-file.jpg"

    default:
      // Handle oneOf, anyOf, allOf
      if (schema.oneOf) {
        const randomSchema = faker.helpers.arrayElement(schema.oneOf)
        return generateDummyData(randomSchema, depth + 1, fieldName)
      }

      if (schema.anyOf) {
        const randomSchema = faker.helpers.arrayElement(schema.anyOf)
        return generateDummyData(randomSchema, depth + 1, fieldName)
      }

      if (schema.allOf) {
        // Merge all schemas and generate data
        const mergedSchema = schema.allOf.reduce(
          (acc, subSchema) => ({
            ...acc,
            ...subSchema,
            properties: { ...acc.properties, ...subSchema.properties },
          }),
          {},
        )
        return generateDummyData(mergedSchema, depth + 1, fieldName)
      }

      return faker.lorem.word()
  }
}

function generateStringValue(schema, fieldName = "") {
  // Handle enum values
  if (schema.enum) {
    return faker.helpers.arrayElement(schema.enum)
  }

  // Handle format-specific values
  switch (schema.format) {
    case "email":
      return faker.internet.email()
    case "uri":
    case "url":
      return faker.internet.url()
    case "date":
      return faker.date.recent().toISOString().split("T")[0]
    case "date-time":
      return faker.date.recent().toISOString()
    case "uuid":
      return faker.string.uuid()
    case "password":
      return faker.internet.password()
    case "binary":
      return faker.string.binary({ length: 10 })
    case "byte":
      return Buffer.from(faker.string.alphanumeric(10)).toString("base64")
    default:
      // Generate based on field name patterns
      const lowerFieldName = fieldName.toLowerCase()
      const lowerTitle = (schema.title || "").toLowerCase()
      const combinedName = lowerFieldName + lowerTitle

      if (combinedName.includes("username")) return faker.internet.userName()
      if (combinedName.includes("firstname")) return faker.person.firstName()
      if (combinedName.includes("lastname")) return faker.person.lastName()
      if (combinedName.includes("name")) return faker.person.fullName()
      if (combinedName.includes("email")) return faker.internet.email()
      if (combinedName.includes("phone")) return faker.phone.number()
      if (combinedName.includes("address")) return faker.location.streetAddress()
      if (combinedName.includes("city")) return faker.location.city()
      if (combinedName.includes("country")) return faker.location.country()
      if (combinedName.includes("company")) return faker.company.name()
      if (combinedName.includes("description")) return faker.lorem.sentence()
      if (combinedName.includes("status")) return faker.helpers.arrayElement(["available", "pending", "sold"])
      if (combinedName.includes("category")) return faker.helpers.arrayElement(["dogs", "cats", "birds"])

      // Respect min/max length
      const minLength = schema.minLength || 1
      const maxLength = schema.maxLength || 50
      const length = faker.number.int({ min: minLength, max: Math.min(maxLength, 100) })

      return faker.string.alphanumeric(length)
  }
}

function generateNumberValue(schema, fieldName = "") {
  const lowerFieldName = fieldName.toLowerCase()

  // Handle specific field names with realistic values
  if (lowerFieldName.includes("petid")) {
    return faker.helpers.arrayElement([1, 2, 3, 10, 100])
  }
  if (lowerFieldName.includes("orderid")) {
    return faker.helpers.arrayElement([1, 2, 3, 10])
  }
  if (lowerFieldName.includes("userid")) {
    return faker.helpers.arrayElement([1, 2, 3])
  }
  if (lowerFieldName.includes("quantity")) {
    return faker.number.int({ min: 1, max: 10 })
  }
  if (lowerFieldName.includes("status")) {
    return faker.number.int({ min: 0, max: 2 })
  }

  const min = schema.minimum || 0
  const max = schema.maximum || 1000

  if (schema.type === "integer") {
    return faker.number.int({ min, max })
  }

  return faker.number.float({ min, max, fractionDigits: 2 })
}

function generateArrayValue(schema, depth, fieldName = "") {
  const minItems = schema.minItems || 1
  const maxItems = schema.maxItems || 3
  const itemCount = faker.number.int({ min: minItems, max: Math.min(maxItems, 5) })

  const items = []
  for (let i = 0; i < itemCount; i++) {
    const item = generateDummyData(schema.items, depth + 1, fieldName)
    if (item !== null) {
      items.push(item)
    }
  }

  return items
}

function generateObjectValue(schema, depth) {
  const obj = {}

  if (schema.properties) {
    Object.entries(schema.properties).forEach(([key, propSchema]) => {
      // Always include required properties
      const isRequired = schema.required && schema.required.includes(key)
      const shouldInclude = isRequired || faker.datatype.boolean({ probability: 0.9 })

      if (shouldInclude) {
        const value = generateDummyData(propSchema, depth + 1, key)
        if (value !== null) {
          obj[key] = value
        }
      }
    })

    // Ensure all required fields are present
    if (schema.required) {
      schema.required.forEach((requiredField) => {
        if (!(requiredField in obj) && schema.properties[requiredField]) {
          const value = generateDummyData(schema.properties[requiredField], depth + 1, requiredField)
          if (value !== null) {
            obj[requiredField] = value
          }
        }
      })
    }

    // Special handling for user objects - ensure username is always present
    if (schema.properties.username && !obj.username) {
      obj.username = faker.internet.userName()
    }

    // Special handling for user objects - ensure required user fields
    if (schema.properties.username || schema.properties.firstName || schema.properties.email) {
      if (!obj.username) obj.username = faker.internet.userName()
      if (!obj.firstName && schema.properties.firstName) obj.firstName = faker.person.firstName()
      if (!obj.lastName && schema.properties.lastName) obj.lastName = faker.person.lastName()
      if (!obj.email && schema.properties.email) obj.email = faker.internet.email()
    }
  }

  // If no properties defined, create a simple object based on common patterns
  if (Object.keys(obj).length === 0) {
    obj.id = faker.number.int({ min: 1, max: 1000 })
    obj.name = faker.lorem.word()
  }

  return obj
}
