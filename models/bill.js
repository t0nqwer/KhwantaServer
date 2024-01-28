import { Schema, model } from "mongoose";

const billSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  products: Array,
  CustomProducts: Array,
  Order: { type: Schema.Types.ObjectId, ref: "Order" },
  payment: { type: String, enum: ["cash", "credit", "transfer"] },
  totalBfDiscount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  totalChange: { type: Number, default: 0 },
  discountType: { type: String, enum: ["percent", "baht"] },
  store: { type: Schema.Types.ObjectId, ref: "Store" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
});

const Bill = model("Bill", billSchema);
export default Bill;
