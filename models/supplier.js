import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
});

const Supplier = model("Supplier", supplierSchema);
export default Supplier;
