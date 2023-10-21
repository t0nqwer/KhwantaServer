import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Customer = model("Customer", customerSchema);
export default Customer;
