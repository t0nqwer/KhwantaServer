import mongoose from "mongoose";
import Supplier from "../models/supplier.js";
import { connectToDatabase } from "./database.js";
import dotenv from "dotenv";
dotenv.config();

const GetAddSupplier = async () => {
  await connectToDatabase();
  const data = [
    { id: 1, name: "Khwanta" },
    { id: 2, name: "สุวรรณฟาร์ม" },
    {
      id: 4,
      name: "SME ไร่นาส่วนผสม บ.หนองหว้า",
      address:
        "กลุ่มวิสาหกิจไร่นาส่วนผสม และเกษตรอินทรีย์ ต.หนองหว้า เลขที่ 4 หมู่ 1 บ.หนองหว้าใหญ่ อ.เมือง จ.หนองบัวลำภู 39000",
    },
    {
      id: 5,
      name: "กอเงินออร์แกนิคฟาร์ม",
      address:
        "บริษัท กอเงินออร์แกนิคฟาร์ม จำกัด เลขที่ 13 หมู่ 7 ต.เมืองใหม่ อ.ศรีบุญเรือง จ.หนองบัวลำภู 39180",
    },
  ];
  await Supplier.deleteMany({});
  await Supplier.insertMany(data);
  mongoose.disconnect();
};
// GetAddSupplier();
