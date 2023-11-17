import Constant from "../../models/constant.js";
import Design from "../../models/design.js";
import Size from "../../models/designSize.js";
import Product from "../../models/product.js";
import Barcode from "../../models/barcode.js";
export const DeleteDesign = async (req, res) => {
  console.log(req.params.id);
  try {
    const design = await Design.findOne({ code: req.params.id });
    const product = await Product.find({ design: design._id });
    const ProductId = product.map((item) => item._id);
    const barcode = await Barcode.find({ product: { $in: ProductId } });
    const barcodeId = barcode.map((item) => item._id);
    await Barcode.deleteMany({ _id: { $in: barcodeId } });
    await Product.deleteMany({ design: design._id });
    await Size.deleteMany({ design: design._id });
    await Design.deleteOne({ code: req.params.id });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
