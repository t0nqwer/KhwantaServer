import { Schema, model } from "mongoose";

const transferSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["transport", "success", "cancel"],
  },
  createdAt: { type: Date, default: Date.now },
  product: { type: Array, required: true },
});

const Transfer = model("Transfer", transferSchema);
export default Transfer;
