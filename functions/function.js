import Constant from "../models/constant.js";

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

// addConstant();
