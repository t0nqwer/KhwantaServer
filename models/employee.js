import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  thaifirstname: { type: String, required: true },
  thailastname: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
  email: { type: String },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  role: { type: String, required: true, default: "employee" },
  createdAt: { type: Date, default: Date.now },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
