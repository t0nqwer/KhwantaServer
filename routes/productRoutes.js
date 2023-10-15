import express from "express";
import {
  FetchAllClothProducts,
  FetchProductById,
  GetAddClothProduct,
  PostAddClothProduct,
} from "../controllers/product/clothProduct.js";
import {
  FetchAllOtherProducts,
  FetchOtherProductById,
  GetAddOtherProduct,
  PostAddOtherProduct,
} from "../controllers/product/otherProduct.js";
import {
  FetchAllExampleProducts,
  FetchExampleProductById,
  GetAddExampleProduct,
  PostAddExampleProduct,
} from "../controllers/product/exampleProduct.js";
const router = express.Router();

router
  .route("/addClothProduct")
  .get(GetAddClothProduct)
  .post(PostAddClothProduct);
router
  .route("/addOtherProduct")
  .get(GetAddOtherProduct)
  .post(PostAddOtherProduct);
router
  .route("/addExampleProduct")
  .get(GetAddExampleProduct)
  .post(PostAddExampleProduct);
router.route("/cloth").get(FetchAllClothProducts);
router.route("/other").get(FetchAllOtherProducts);
router.route("/example").get(FetchAllExampleProducts);
router.route("/cloth/:id").get(FetchProductById);
router.route("/other/:id").get(FetchOtherProductById);
router.route("/example/:id").get(FetchExampleProductById);

export default router;
