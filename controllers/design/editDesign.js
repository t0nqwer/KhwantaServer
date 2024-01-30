import Constant from "../../models/constant.js";
import Design from "../../models/design.js";
import Barcode from "../../models/barcode.js";
import Product from "../../models/product.js";

import Size from "../../models/designSize.js";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase.js";
import { onLog } from "firebase/app";

export const editDesign = async (req, res) => {
  try {
    const data = req.body.data;
    const { id } = req.params;
    const design = await Design.findOne({ code: id });
    await Design.findOneAndUpdate(
      { code: id },
      {
        name: data.name,
        brand: data.brand,
        category: data.category,
        pattern: data.pattern,
      }
    );
    const size = await Size.find({ design: design._id });
    const sizeInputList = [
      ...new Set(req.body.data.sizeInput.map((item) => item.size)),
    ];
    // console.log(req.body.data.sizeInput);
    const sizeList = size.map((item) => item.size);
    const removeSize = sizeList.filter((item) => !sizeInputList.includes(item));
    const newSize = sizeInputList.filter((item) => !sizeList.includes(item));
    console.log(newSize, "newSize");
    const sizeInput = sizeInputList.map((item) => ({
      size: item,
      design: design._id,
      details: data.sizeInput
        .map((e) => {
          if (item === e.size) {
            return { detail: e.detail, amount: e.data };
          }
        })
        .filter((e) => e !== undefined),
    }));

    const updateDesign = sizeInput.map(async (item) => {
      await Size.findOneAndUpdate(
        { size: item.size, design: design._id },
        { $set: { details: item.details } }
      );
    });

    await Promise.all(updateDesign);

    if (removeSize.length > 0) {
      await Size.deleteMany({ size: { $in: removeSize } });
    }
    if (newSize.length > 0) {
      const createSize = newSize.map((item) => ({
        design: design._id,
        size: item,
        details: data.sizeInput
          .map((e) => {
            if (item === e.size) {
              return { detail: e.detail, amount: e.data };
            }
          })
          .filter((e) => e !== undefined),
      }));
      await Size.insertMany(createSize);
      const ProductList = await Product.find({ design: design._id })
        .populate("fabric")
        .populate("design")
        .exec();
      const newSizeList = await Size.find({ design: design._id });
      const BarcodeList = await Barcode.find({
        product: { $in: ProductList.map((item) => item._id) },
      }).populate("size");
      const barcodelistsizeId = BarcodeList.map((item) => item.size);
      const barcodelistsize = await Size.find({
        _id: { $in: barcodelistsizeId },
      });
      const SizeListSizeName = barcodelistsize.map((item) => item.size);
      const newSizeListSize = newSizeList.map((item) => item.size);
      const filterId = newSizeListSize.filter(
        (item) => !SizeListSizeName.includes(item)
      );
      const createbarcode = ProductList.map((ProductItem) => {
        const newSizedata = filterId.map((item) => {
          const size = newSizeList.find((e) => e.size === item);
          return {
            product: ProductItem._id,
            size: size._id,
            barcode: `${ProductItem.design.code.split("t").join("")}${(
              ProductItem.fabric.id + 1000
            )
              .toString()
              .slice(-3)}${item === "FREESIZE" ? "F" : item}`,
          };
        });
        return newSizedata;
      }).flat();
      console.log(createbarcode);
      const oldbarcode = await Barcode.find({
        barcode: { $in: createbarcode.map((item) => item.barcode) },
      });
      const newBarcode = createbarcode.filter(
        (item) => !oldbarcode.map((e) => e.barcode).includes(item.barcode)
      );
      const oldbarcodeId = oldbarcode.map(
        async (item) =>
          await Barcode.findOneAndUpdate(
            { barcode: item.barcode },
            { $set: { size: item.size } }
          )
      );
      await Promise.all(oldbarcodeId);
      await Barcode.insertMany(newBarcode);
    }

    res.status(200).json({ message: "success", id: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const AddDetailImage = async (req, res) => {
  const { id, img } = req.body;
  try {
    const Designdata = await Design.findOne({ code: id });
    let DetailImage = Designdata.DetailImage;
    if (!DetailImage) {
      DetailImage = [];
    }
    DetailImage.push(img);
    await Design.findOneAndUpdate(
      { code: id },
      { $set: { DetailImage: DetailImage } }
    );
    const design = await Design.findOne({ code: id });
    const size = await Size.find({ design: design._id });
    res.status(200).json({ message: "success", data: { design, size } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const DeleteDetailImage = async (req, res) => {
  const { id, img } = req.body;
  console.log(id, img);

  const desertRef = ref(storage, img);
  deleteObject(desertRef)
    .then(async () => {
      console.log("delete success");
      const Designdata = await Design.findOne({ code: id });
      const DetailImage = Designdata.DetailImage;
      const filterImage = DetailImage.filter((e) => e !== img);
      await Design.findOneAndUpdate(
        { code: id },
        { $set: { DetailImage: filterImage } }
      );
      const design = await Design.findOne({ code: id });
      const size = await Size.find({ design: design._id });

      res.status(200).json({ message: "success", data: { design, size } });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
};
