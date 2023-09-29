import Design from "../../models/design.js";
import Fabric from "../../models/fabric.js";
import Product from "../../models/product.js";
import Size from "../../models/designSize.js";
import Barcode from "../../models/barcode.js";

export const GetAddClothProduct = async (req, res) => {
  try {
    const design = await Design.find();
    const fabric = await Fabric.find();
    const product = await Product.find();
    res.status(200).json({ design, fabric, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const PostAddClothProduct = async (req, res) => {
  try {
    const design = await Design.findOne({ code: req.body.data.code }).select(
      "_id name code"
    );
    const fabric = await Fabric.findOne({ name: req.body.data.fabric }).select(
      "_id name id"
    );
    const product = new Product({
      name: `${design.name} ${fabric.name}`,
      design: design._id,
      category: "เสื้อผ้า",
      supplier: "Khwanta",
      fabric: fabric._id,
      price: req.body.data.price,
      description: req.body.data.description,
      frontImage: req.body.image[2],
      backImage: req.body.image[1],
      DetailImage: req.body?.image[0],
    });
    const resdata = await product.save();
    const size = await Size.find({ design: design._id });
    console.log(resdata, size);
    const createbarcode = size.map((item) => ({
      product: resdata._id,
      size: item._id,
      barcode: `${design.code.split("t").join("")}${(fabric.id + 1000)
        .toString()
        .slice(-3)}${item.size === "FREESIZE" ? "F" : item.size}`,
    }));
    await Barcode.insertMany(createbarcode);
    console.log(createbarcode);
    res.status(200).json({ message: "success", id: resdata._id });
  } catch (error) {
    await Product.deleteOne({ name: req.body.data.name });
    res.status(500).json({ message: error.message });
  }
};
export const FetchAllClothProducts = async (req, res) => {
  const { search, page } = req.query;
  console.log(search, page);
  const limit = 20;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("design fabric")
      .exec();
    console.log(products);

    const total = await Product.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .count()
      .exec();
    console.log(total);
    res.status(200).json({ products, pagecount: Math.ceil(total / 20) });
  } catch (error) {
    console.log(error);
  }
};

export const FetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("design fabric").exec();
    const size = await Size.find({ design: product.design._id }).exec();
    console.log({ product });
    res.status(200).json({ ...product._doc, size });
  } catch (error) {
    console.log(error);
  }
};