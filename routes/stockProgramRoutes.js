import express from "express";
import { startApp } from "../controllers/stockProgram/getData.js";
const router = express.Router();

router.get("/startApp", startApp);

export default router;
