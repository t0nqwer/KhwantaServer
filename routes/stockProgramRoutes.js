import express from "express";
import { startApp } from "../controllers/stockProgram/getData.js";
import { StockIn, updateStock } from "../controllers/stockProgram/Stock.js";
const router = express.Router();

router.get("/startApp", startApp);
router.post("/stockin", StockIn, updateStock);

export default router;
