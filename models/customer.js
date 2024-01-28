import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  CustomerId: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  EngfirstName: { type: String },
  EnglastName: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  phone: { type: String },
  email: { type: String },
  note: { type: String },
  LineId: { type: String },
  LineName: { type: String },
  FaceBookProfile: { type: String },
  InstagramProfile: { type: String },
  Image: { type: String },
  gender: { type: String },
  birthday: { type: Date },
});

const Customer = model("Customer", customerSchema);
export default Customer;
