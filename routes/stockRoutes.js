import express from "express";
import { getCreateTransfers } from "../controllers/stock/transfer.js";
import { getAllStore } from "../controllers/store/event.js";
const router = express.Router();

router.post("/addStock");
router.get("/stock");
// router.route("/createtransfer").get("/store", getAllStore).post();

export default router;
