import express from "express";
import {
  confirmTransfer,
  getTransfer,
} from "../controllers/stock/TransferMain.js";

const router = express.Router();

router.get("/", getTransfer);
router.post("/confirm", confirmTransfer, getTransfer);

export default router;
