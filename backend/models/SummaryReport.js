import mongoose from "mongoose";

const summaryReportSchema = new mongoose.Schema({
  oasUrl: String,
  totalEndpoints: Number,
  testedEndpoints: Number,
  successCount: Number,
  failureCount: Number,
  successRate: Number,
  endpointStats: Array,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("SummaryReport", summaryReportSchema);
