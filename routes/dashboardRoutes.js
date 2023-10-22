import express from "express";
import { firstSection } from "../controllers/dashboard/productdata.js";

const router = express.Router();

router.get("/firstSection", firstSection);

export default router;
