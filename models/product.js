import { Schema, model } from "mongoose";
import Design from "./design.js";
import Fabric from "./fabric.js";

const productSchema = new Schema({
  name: { type: String, required: true },
  design: { type: Schema.Types.ObjectId, ref: "Design" },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
  fabric: { type: Schema.Types.ObjectId, ref: "Fabric" },
  price: { type: Number, required: true },
  description: String,
  frontImage: { type: String, required: true },
  frontthumbnail: String,
  backImage: { type: String, required: true },
  DetailImage: Array,
  clothCategory: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  clothId: Number,
  otherId: Number,
  exampleId: Number,
});

const Product = model("Product", productSchema);
export default Product;
