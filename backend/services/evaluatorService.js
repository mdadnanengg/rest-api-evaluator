import axios from "axios";
import { generateDummyData } from "../utils/dummyData.js";

export function extractEndpoints(api) {
  const endpoints = [];
  for (const path in api.paths) {
    for (const method in api.paths[path]) {
      if (["get", "post"].includes(method)) {
        endpoints.push({
          path: path.replace(/{([^}]+)}/g, `${1}`),
          method,
          parameters: api.paths[path][method].parameters || [],
          requestBody: api.paths[path][method].requestBody
        });
      }
    }
  }
  return endpoints;
}

export async function testEndpoints(endpoints) {
  const logs = [];
  let successCount = 0;
  let failureCount = 0;

  for (const endpoint of endpoints) {
    let dummyData = null;
    try {
      let response;
      const url = `https://petstore.swagger.io/v2${endpoint.path}`;

      if (endpoint.method === "get") {
        response = await axios.get(url);
      } else if (endpoint.method === "post") {
        dummyData = generateDummyData(endpoint);
        response = await axios.post(url, dummyData);
      }

      logs.push({
        endpoint: endpoint.path,
        method: endpoint.method.toUpperCase(),
        request: dummyData,
        response: response.data,
        statusCode: response.status
      });

      (response.status >= 200 && response.status < 300) ? successCount++ : failureCount++;
    } catch (error) {
      logs.push({
        endpoint: endpoint.path,
        method: endpoint.method.toUpperCase(),
        request: dummyData,
        error: error.message,
        statusCode: error.response?.status || 500
      });
      failureCount++;
    }
  }

  return { logs, successCount, failureCount };
}

export function generateSummary(testResults, oasUrl) {
  const totalEndpoints = testResults.successCount + testResults.failureCount;
  const successRate = (testResults.successCount / totalEndpoints) * 100;

  const endpointStats = testResults.logs.map(log => ({
    endpoint: log.endpoint,
    method: log.method,
    statusCode: log.statusCode,
    success: log.statusCode >= 200 && log.statusCode < 300
  }));

  return {
    oasUrl,
    totalEndpoints,
    testedEndpoints: totalEndpoints,
    successCount: testResults.successCount,
    failureCount: testResults.failureCount,
    successRate,
    endpointStats
  };
}
