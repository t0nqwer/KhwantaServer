import express from "express";
import { GetAddDesign } from "../controllers/design.js";

const router = express.Router();

router.get("/addDesign", GetAddDesign);

export default router;
