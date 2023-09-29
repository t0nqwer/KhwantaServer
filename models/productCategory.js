import { Schema, model } from "mongoose";

const productCategorySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const ProductCategory = model("ProductCategory", productCategorySchema);
export default ProductCategory;
