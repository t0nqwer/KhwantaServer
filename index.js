import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import { connectToDatabase } from "./functions/database.js";
import DesignRoutes from "./routes/designRoutes.js";
import "./functions/function.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/design", DesignRoutes);
connectToDatabase();
const port = parseInt(process.env.PORT) || 7070;
app.listen(port, () => {
  console.log(`helloworld: listening on http://localhost:${port}`);
});
