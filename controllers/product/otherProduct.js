import Supplier from "../../models/supplier.js";
import ProductCategory from "../../models/productCategory.js";
import Product from "../../models/product.js";
import Barcode from "../../models/barcode.js";

export const GetAddOtherProduct = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    const categories = await ProductCategory.find({});
    const data = {
      suppliers: suppliers.map((supplier) => supplier.name),
      categories: categories.map((category) => category.name),
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const PostAddOtherProduct = async (req, res, next) => {
  try {
    const { name, price, supplier, category } = req.body.data;
    const lastOtherId = await Product.findOne({
      otherId: { $exists: true },
    }).sort({ otherId: -1 });
    const frontImage = req.body.image[2];
    const backImage = req.body.image[1];
    const DetailImage = req.body.image[0];
    const newProduct = new Product({
      name,
      supplier,
      category,
      price,
      frontImage,
      backImage,
      DetailImage: DetailImage ? DetailImage : [],
      otherId: lastOtherId ? lastOtherId.otherId + 1 : 1,
    });
    await newProduct.save();
    const categoryId = await ProductCategory.findOne({ name: category });
    const supplierId = await Supplier.findOne({ name: supplier });
    const barcode = new Barcode({
      product: newProduct._id,
      barcode: `OT${(lastOtherId ? lastOtherId.otherId + 1 : 1 + 1000)
        .toString()
        .slice(-3)}${(categoryId.id + 100).toString().slice(-2)}${(
        supplierId.id + 100
      )
        .toString()
        .slice(-2)}`,
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
export const FetchAllOtherProducts = async (req, res) => {
  const { search, page } = req.query;

  const limit = 20;
  try {
    const data = await Product.find({
      $and: [
        { otherId: { $exists: true } },
        {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { supplier: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
          ],
        },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments({
      $and: [
        { otherId: { $exists: true } },
        {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { supplier: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
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
export const FetchOtherProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const barcode = await Barcode.findOne({ product: product._id });

    res.status(200).json({ ...product._doc, barcode: barcode.barcode });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const DeleteOtherProductById = async (req, res) => {};
