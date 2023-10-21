import { Schema, model } from "mongoose";

const product = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  size: { type: Schema.Types.ObjectId, ref: "Size" },
  barcode: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const billSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  createdAt: { type: Date, default: Date.now },
  Store: { type: Schema.Types.ObjectId, ref: "Store" },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});
const Bill = model("Bill", billSchema);
export default Bill;
