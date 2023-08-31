import Constant from "../models/constant.js";

export const GetAddDesign = async (req, res) => {
  try {
    const data = await Constant.findOne().select(
      "designCategory designPattern designBrand sizeDetails size"
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
