import { Schema, model } from "mongoose";

const CustomerIdCounterSchema = new Schema({
  CustomerId: { type: Number },
});

const CustomerIdCounter = model("CustomerIdCounter", CustomerIdCounterSchema);
export default CustomerIdCounter;
