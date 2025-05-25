import express from "express"
import { evaluateAPI, getReports, getTestLogs } from "../controllers/evaluateController.js"

const router = express.Router()

router.post("/evaluate", evaluateAPI)
router.get("/reports", getReports)
router.get("/logs", getTestLogs)

export default router
