import Constant from "../../models/constant.js";
import Product from "../../models/product.js";
import Barcode from "../../models/barcode.js";

export const GetAddExampleProduct = async (req, res) => {
  try {
    const categories = await Constant.findOne().select("designCategory");
    const data = {
      categories: categories.designCategory,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const PostAddExampleProduct = async (req, res, next) => {
  try {
    const { category, name, description, price } = req.body.data;
    const frontImage = req.body.image[2];
    const backImage = req.body.image[1];
    const DetailImage = req.body.image[0];
    const lastExampleId = await Product.findOne({
      exampleId: { $exists: true },
    }).sort({ exampleId: -1 });
    const newProduct = new Product({
      name,
      supplier: "Khwanta",
      category: "เสื้อผ้า",
      price,
      description,
      frontImage,
      backImage,
      DetailImage,
      clothCategory: category,
      exampleId: lastExampleId ? lastExampleId.exampleId + 1 : 1,
    });
    await newProduct.save();
    const barcode = new Barcode({
      product: newProduct._id,
      barcode: `EX${(newProduct.exampleId + 10000)
        .toString()
        .slice(-4)}${new Date().getFullYear().toString().slice(-2)}`,
    });
    await barcode.save();
    const newbarcode = await Barcode.find({ _id: barcode._id })
      .populate("product")
      .exec();
    const product = newbarcode.map((e) => ({
      _id: e.barcode,
      name: e.product.name,
      design: e?.product?.design?.code,
      price: e.product.price,
      size: e?.size?.size,
      fabric: e.product?.fabric?.name,
      supplier: e.product.supplier,
    }));
    req.Newproduct = product;
    req.NewImage = frontImage;
    req.resdata = { message: "success", id: newProduct._id };
    next();
    // res.status(200).json({ message: "success", id: newProduct._id });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const FetchAllExampleProducts = async (req, res) => {
  const { search, page } = req.query;

  const limit = 20;
  try {
    const data = await Product.find({
      $and: [
        { exampleId: { $exists: true } },
        {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { supplier: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
            { clothCategory: { $regex: req.query.search, $options: "i" } },
          ],
        },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments({
      $and: [
        { exampleId: { $exists: true } },
        {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { supplier: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
            { clothCategory: { $regex: req.query.search, $options: "i" } },
          ],
        },
      ],
    });
    res.status(200).json({ products: data, pagecount: Math.ceil(total / 20) });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const FetchExampleProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const barcode = await Barcode.findOne({ productId: req.params.id });
    res.status(200).json({ ...product._doc, barcode: barcode.barcode });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const DeleteExampleProductById = async (req, res) => {
  try {
  } catch (error) {}
};
