import express from "express";
import { startApp } from "../controllers/stockProgram/getData.js";
import { StockIn, updateStock } from "../controllers/stockProgram/Stock.js";
import { NewTransfer } from "../controllers/stockProgram/Transfer.js";
import { AlertNewTransfer } from "../socket.io/Func.js";
const router = express.Router();

router.get("/", startApp);
router.post("/startApp", startApp);
router.post("/stockin", StockIn, updateStock);
router.post("/transfer", NewTransfer, AlertNewTransfer);

export default router;
