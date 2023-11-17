import Design from "../models/design.js";
import Size from "../models/designSize.js";
import Fabric from "../models/fabric.js";
import Barcode from "../models/barcode.js";
import { connectToDatabase } from "./database.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Product from "../models/product.js";
import ProductCategory from "../models/productCategory.js";
import Supplier from "../models/supplier.js";
dotenv.config();

const transferDesign = async () => {
  await connectToDatabase();
  try {
    const { data } = await axios.get("http://localhost:8000/transferDesign");

    await Size.deleteMany();
    const size = data.map(async (design) => {
      const newDesign = await Design.findOne({ code: design.code });

      const sizes = design.size.map((size) => ({
        ...size,
        design: newDesign._id,
      }));
      return sizes;
    });
    const result = await Promise.all(size);
    // console.log(result.flat());
    await Size.insertMany(result.flat());
    // console.log(result.flat());
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};
const transferBarcode = async () => {
  await connectToDatabase();
  try {
    const { data } = await axios.get(
      "http://192.168.0.241:7070/transferProduct"
    );
    // console.log(data);
    const prevData = data.map(async (e) => {
      const design = await Design.findOne({ code: e.code });
      const fabric = await Fabric.findOne({ id: e.fabric });
      const barcode = e.barcode.map(async (b) => {
        const size = await Size.findOne({ design: design._id, size: b.size });
        return { barcode: b.barcode, size: size._id };
      });

      const result = await Promise.all(barcode);
      return {
        ...e,
        design: design._id,
        fabric: fabric._id,
        name: `${design.name}${fabric.name}`,
        clothId: e.ClothId,
        barcode: result,
      };
    });
    const result = await Promise.all(prevData);
    console.log(result);
    await Product.deleteMany({});
    await Promise.all(
      result.map(async (e) => {
        const product = await Product.create(e);
        const bar = e.barcode.map((p) => ({ ...p, product: product._id }));
        await Barcode.insertMany(bar);
      })
    );
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};
const transfer = async () => {
  await connectToDatabase();
  try {
    const { data } = await axios.get(
      "http://localhost:8000/transferOtherProduct"
    );
    // console.log(data);
    const otherProduct = await Product.find({
      otherId: { $exists: true },
    }).select("_id");
    await Product.deleteMany({
      otherId: { $exists: true },
    });
    await Barcode.deleteMany({
      product: { $in: otherProduct.map((e) => e._id) },
    });
    await Promise.all(
      data.map(async (e) => {
        const product = await Product.create(e);
        const categoryId = await ProductCategory.findOne({ name: e.category });
        const supplierId = await Supplier.findOne({ name: e.supplier });
        console.log(categoryId, supplierId);
        const bar = {
          product: product._id,
          barcode: `OT${(e.otherId + 1000).toString().slice(-3)}${(
            categoryId.id + 100
          )
            .toString()
            .slice(-2)}${(supplierId.id + 100).toString().slice(-2)}`,
        };
        await Barcode.create(bar);
      })
    );
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

// transferDesign();
