import swaggerParser from "swagger-parser";
import TestLog from "../models/TestLog.js";
import SummaryReport from "../models/SummaryReport.js";
import { extractEndpoints, testEndpoints, generateSummary } from "../services/evaluatorService.js";

export const evaluateAPI = async (req, res) => {
  try {
    const { oasUrl } = req.body;
    const api = await swaggerParser.validate(oasUrl);
    const endpoints = extractEndpoints(api);
    const testResults = await testEndpoints(endpoints);
    const summary = generateSummary(testResults, oasUrl);

    await TestLog.insertMany(testResults.logs);
    await SummaryReport.create(summary);

    res.json({ success: true, summary, logs: testResults.logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
