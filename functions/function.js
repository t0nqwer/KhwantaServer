import Constant from "../models/constant.js";
import { storage } from "../firebase.js";
import Design from "../models/design.js";
import {
  getBlob,
  ref,
  getDownloadURL,
  getBytes,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import sharp from "sharp";
import CustomerIdCounter from "../models/Counter/customerIdCounter.js";
const addConstant = async () => {
  await Constant.create({
    designCategory: [
      "เสื้อ",
      "กางเกง",
      "เสื้อคลุมสั้น",
      "เสื้อคลุมยาว",
      "ชุดหมี",
      "เดรส",
      "ผ้าถุง",
    ],
    designPattern: ["เตี้ย", "นงค์", "อ๋อย"],
    designBrand: ["Khwanta", "Lalynn"],
    size: ["SS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "FREESIZE"],
    sizeDetails: [
      "รอบอก",
      "รอบเอว",
      "เสื้อยาว",
      "กางเกงยาว ",
      "กระโปรงยาว",
      "ชุดยาว",
      "รอบสะโพก",
      "ไหล่",
      "แขนยาว",
      "เอวยืดได้",
      "ความยาวเสื้อหน้า",
      "ความยาวเสื้อหลัง",
    ],
  });
};

const TestDownload = async () => {
  let i = 0;
  // await Design.updateMany({}, { frontthumbnail: null });
  const designcount = await Design.find({
    frontthumbnail: null,
  });
  const finishprogress = 100 / designcount.length;
  const reuploadPromise = designcount.map(async (design) => {
    console.log(design.code);
    const url = design.FrontImage;
    const storageRef = ref(storage, url);
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
    const fileRef = ref(storage, `thumbnail/${metadata.name}`);
    const uploadTask = await uploadBytes(fileRef, sharpBuffer, "image/jpeg");
    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log(metadata.name);
    await Design.updateOne(
      { _id: design._id },
      { frontthumbnail: downloadURL }
    );
    i = i + finishprogress;
    console.log(i);
  });
  Promise.all(reuploadPromise).then(() => {
    console.log("done");
  });
  // const design = await Design.findOne({
  //   frontthumbnail: { $exists: false },
  // });
  // console.log(design.code);
};
const insertid = async () => {
  const customer = await CustomerIdCounter.create({
    CustomerId: 0,
  });
  console.log(customer);
};

// const blob = await getBlob(storageRef);
// console.log(blobUrl);

// addConstant();

// TestDownload();
