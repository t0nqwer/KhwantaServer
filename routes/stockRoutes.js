import express from "express";

import {
  getStockByProduct,
  getStockByShop,
} from "../controllers/stock/StockData.js";

const router = express.Router();

router.route("/byshop").get(getStockByShop);
router.route("/byproduct").get(getStockByProduct);
// router.route("/createtransfer").get("/store", getAllStore).post();

export default router;
