import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  size: { type: Schema.Types.ObjectId, ref: "Size" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  items: [orderItemSchema],
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "pending",
    enun: ["pending", "completed", "cancelled"],
  },
  orderDetailPic: { type: Array, default: [] },
  issueStore: { type: Schema.Types.ObjectId, ref: "Store" },
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
});
const Order = model("Order", orderSchema);
export default Order;
