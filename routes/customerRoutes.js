import express from "express";
import {
  getAllCustomer,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/Customer/Customer.js";

const router = express.Router();

router.route("/").get(getAllCustomer).post(createCustomer);
router
  .route("/:id")
  .get(getCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer);

export default router;
