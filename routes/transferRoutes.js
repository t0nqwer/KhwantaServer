import express from "express";
import { getTransfer } from "../controllers/stock/TransferMain.js";

const router = express.Router();

router.get("/", getTransfer);

export default router;
