import Barcode from "../../models/barcode.js";
import Product from "../../models/product.js";
import Design from "../../models/design.js";
import Store from "../../models/store.js";
import Size from "../../models//designSize.js";
import { populate } from "dotenv";

export const startApp = async (req, res) => {
  try {
    const barcodes = await Barcode.find()
      //   .limit(1000)
      .populate("product")
      .populate("size")
      .exec();
    // const updateSize = barcodes
    //   .filter((e) => e.size)
    //   .map(async (e) => {
    //     let size = e.barcode.slice(-5).replace(/[0-9]/g, "");
    //     size = size === "F" ? "FREESIZE" : size;
    //     const design = await Size.findOne({
    //       design: e.product.design,
    //       size: size,
    //     })
    //       .populate("design")
    //       .exec();
    //     console.log({ design, size: e.size, newsize: size });
    //     if (!design) {
    //       console.log("no design");
    //       return;
    //     }
    //     const update = await Barcode.findByIdAndUpdate(e._id, {
    //       size: design._id,
    //     });
    //     return { update };
    //   });

    const adddata = barcodes.map(async (e) => {
      const fabric = await Product.findById(e.product._id)
        .populate("fabric")
        .populate("design")
        .exec();
      return { ...e._doc, product: fabric };
    });

    // const products = adddata.map((e) => ({
    //   _id: e.barcode,
    //   name: e.product.name,
    //   design: e.design,
    //   price: e.product.price,
    //   size: e.size.size,
    //   fabric: e.fabric,
    // }))

    const stores = await Store.find();
    Promise.all(adddata).then(async (e) => {
      const product = e.map((e) => ({
        _id: e.barcode,
        name: e.product.name,
        design: e?.product?.design?.code,
        price: e.product.price,
        size: e?.size?.size,
        fabric: e.product?.fabric?.name,
        supplier: e.product.supplier,
      }));
      //   const noSize = product
      //     .filter((e) => !e.size && e.design)
      //     .map((e) => e._id);

      //   await Barcode.deleteMany({ barcode: { $in: noSize } });
      //   console.log(noSize);
      res.status(200).json({ data: product, stores });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
