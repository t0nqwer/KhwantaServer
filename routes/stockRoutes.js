import express from "express";

import {
  getStockByProduct,
  getStockByShop,
} from "../controllers/stock/StockData.js";
import { getPrintStock } from "../controllers/stockProgram/Stock.js";

const router = express.Router();

router.route("/byshop").get(getStockByShop);
router.route("/byproduct").get(getStockByProduct);
// router.route("/createtransfer").get("/store", getAllStore).post();
router.get("/print/:shop", getPrintStock);
export default router;
