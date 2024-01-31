import express from "express";
import { startApp } from "../controllers/stockProgram/getData.js";
import { StockIn, updateStock } from "../controllers/stockProgram/Stock.js";
import {
  NewTransfer,
  deleteTransfer,
} from "../controllers/stockProgram/Transfer.js";
import { AlertNewTransfer } from "../socket.io/Func.js";
import { savebill } from "../controllers/stockProgram/Pos.js";
const router = express.Router();

router.get("/startApp", startApp);
router.post("/startApp", startApp);
router.post("/stockin", StockIn, updateStock);
router
  .route("/transfer")
  .post(NewTransfer, AlertNewTransfer)
  .put(deleteTransfer);
router.post("/saleBill", savebill);

export default router;
