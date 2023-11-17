import axios from "axios";
import { connectToDatabase } from "./database.js";
import Fabric from "../models/fabric.js";
import FabricPattern from "../models/fabricPattern.js";
import FabricTechnique from "../models/fabricTechnique.js";
import FabricType from "../models/fabricType.js";
import FabricColor from "../models/fabricColor.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const getFabricData = async () => {
  await connectToDatabase();
  const response = await axios.get(
    "http://192.168.0.241:7070/fabric/getcurrent"
  );
  console.log(response.data.resdata);
  await Fabric.deleteMany({});
  await FabricPattern.deleteMany({});
  await FabricTechnique.deleteMany({});
  await FabricType.deleteMany({});
  await FabricColor.deleteMany({});

  await Fabric.insertMany(response.data.resdata.fabric);
  await FabricPattern.insertMany(
    response.data.resdata.Pattern.map((pattern) => ({ name: pattern }))
  );
  await FabricTechnique.insertMany(
    response.data.resdata.Weaving.map((technique) => ({ name: technique }))
  );
  await FabricType.insertMany(
    response.data.resdata.Type.map((type) => ({ name: type }))
  );
  await FabricColor.insertMany(
    response.data.resdata.Color.map((color) => ({ name: color }))
  );
  mongoose.disconnect();
  return response.data.resdata;
};

// getFabricData();
