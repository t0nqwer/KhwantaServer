import express from "express";
import {
  CheckToken,
  GetAllUser,
  Login,
  Register,
} from "../controllers/User/Auth.js";

const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);
router.get("/all", GetAllUser);
router.get("/checkTokenStatus", CheckToken);

export default router;
