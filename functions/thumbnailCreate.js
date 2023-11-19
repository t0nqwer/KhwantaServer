import sharp from "sharp";
import Product from "../models/product.js";
import {
  getBlob,
  ref,
  getDownloadURL,
  getBytes,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { storage } from "../firebase.js";

export const createProductThumbnail = async (req, res, next) => {
  const resdata = req.resdata;
  const NewImage = req.NewImage;
  console.log(NewImage);
  const storageRef = ref(storage, NewImage);
  const urldata = await getBytes(storageRef);
  const metadata = await getMetadata(storageRef);
  const buffer = Buffer.from(urldata);
  const sharpBuffer = await sharp(buffer)
    .resize({
      width: 300,
      height: 400,
      fit: "contain",
      position: "center",
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .withMetadata()
    .jpeg()
    .toBuffer();
  const fileRef = ref(storage, `thumbnail/Product/${metadata.name}`);
  const uploadTask = await uploadBytes(fileRef, sharpBuffer, "image/jpeg");
  const downloadURL = await getDownloadURL(uploadTask.ref);
  console.log(metadata.name);
  await Product.updateOne({ _id: resdata.id }, { frontthumbnail: downloadURL });

  res.status(200).json(resdata);
};
