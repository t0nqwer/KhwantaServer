import express from "express";
import { createStore, getAllStore } from "../controllers/store/event.js";
const router = express.Router();

router.post("/create", createStore);
router.get("", getAllStore);
router.put("/update");

export default router;
