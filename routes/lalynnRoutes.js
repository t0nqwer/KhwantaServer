import express from "express";
import {
  fetchHeroProduct,
  fetchProduct,
  fetchProducts,
} from "../controllers/lalynnWebsite/fetchdata.js";
const router = express.Router();

router.get("/fetchHeroProduct", fetchHeroProduct);
router.get("/fetchProduct/:id", fetchProduct);
router.get("/fetchProducts", fetchProducts);

export default router;
