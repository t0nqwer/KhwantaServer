import { Schema, model } from "mongoose";

const billSchema = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date },
  products: Array,
  customProducts: Array,
  Order: { type: Schema.Types.ObjectId, ref: "Order" },
  payment: { type: String, enum: ["cash", "credit", "transfer"] },
  totalBfDiscount: { type: Number, default: 0 },

  total: { type: Number, default: 0 },
  disamout: { type: Number },
  distype: {
    type: String,
    enum: ["percent", "int"],
  },
  totalPay: { type: Number, default: 0 },
  totalChange: { type: Number, default: 0 },

  store: { type: Schema.Types.ObjectId, ref: "Store" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
});

const Bill = model("Bill", billSchema);
export default Bill;
