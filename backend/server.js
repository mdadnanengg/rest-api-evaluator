import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import "./config/db.js";
import evaluateRoutes from "./routes/evaluateRoutes.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/api-evaluator";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api", evaluateRoutes);

// connection and start port
connectDb(DB_URL).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
})