import ProductCategory from "../models/productCategory.js";
import { connectToDatabase } from "./database.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const GetAddProductCategory = async () => {
  await connectToDatabase();
  const data = [
    { id: 1, name: "ผ้า" },
    { id: 2, name: "เนคไท" },
    { id: 3, name: "กระเป๋า" },
    { id: 4, name: "เสื้อผ้า" },
    { id: 5, name: "อาหาร" },
    { id: 6, name: "ของใช้" },
    { id: 7, name: "เครื่องประดับ" },
    { id: 8, name: "สมุนไพรไม่ใช่อาหาร" },
    { id: 9, name: "เครื่องสำอาง" },
  ];
  await ProductCategory.deleteMany({});
  await ProductCategory.insertMany(data);
  mongoose.disconnect();
};

GetAddProductCategory();
