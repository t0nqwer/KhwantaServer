import Design from "../models/design.js";
import Size from "../models/designSize.js";
import { connectToDatabase } from "./database.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const transferDesign = async () => {
  await connectToDatabase();
  try {
    const { data } = await axios.get(
      "http://192.168.0.241:7070/transferDesign"
    );

    const size = data.map(async (design) => {
      const newDesign = await Design.findOne({ code: design.code });

      const sizes = design.size.map((size) => ({
        ...size,
        design: newDesign._id,
      }));
      return sizes;
    });
    const result = await Promise.all(size);
    await Size.insertMany(result.flat());
    // console.log(result.flat());
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};
transferDesign();
