import express from "express";
import { evaluateAPI } from "../controllers/evaluateController.js";

const router = express.Router();

router.post("/evaluate", evaluateAPI);

export default router;
