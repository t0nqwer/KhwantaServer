import { Schema, model } from "mongoose";

const transferSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["transport", "success", "cancel"],
  },
  type: {
    type: String,
    required: true,
    enum: ["import", "export", "manufacture", "transfer"],
  },
  localid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  successAt: { type: Date },
  product: { type: Array, required: true },
});
const Transfer = model("Transfer", transferSchema);
export default Transfer;
