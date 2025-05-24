import mongoose from "mongoose";

const testLogSchema = new mongoose.Schema({
  endpoint: String,
  method: String,
  request: Object,
  response: Object,
  statusCode: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("TestLog", testLogSchema);
