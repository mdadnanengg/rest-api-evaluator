export function generateDummyData(endpoint) {
  const dummyData = {};
  const schema = endpoint.requestBody?.content?.["application/json"]?.schema;

  if (schema?.properties) {
    for (const prop in schema.properties) {
      const type = schema.properties[prop].type;
      dummyData[prop] = generateDummyValue(type);
    }
  }

  return dummyData;
}

function generateDummyValue(type) {
  switch (type) {
    case "string": return "dummy-string";
    case "number": return 123;
    case "boolean": return true;
    case "integer": return 456;
    default: return "dummy-value";
  }
}
