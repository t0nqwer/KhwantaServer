import Constant from "../../models/constant.js";
import Design from "../../models/design.js";
import Size from "../../models/designSize.js";

export const GetAddDesign = async (req, res) => {
  try {
    const data = await Constant.findOne().select(
      "designCategory designPattern designBrand sizeDetails size"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addDesign = async (req, res) => {
  const data = req.body.data;
  const image = req.body.image;
  try {
    console.log(data, image);
    const design = await Design.create({
      code: data.code,
      name: data.name,
      brand: data.brand,
      category: data.category,
      pattern: data.pattern,
      FrontImage: image[2],
      BackImage: image[1],
      DetailImage: image[0],
    });
    const sizeInput = data.size.map((item) => ({
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
    await Size.insertMany(sizeInput);
    console.log(sizeInput);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
