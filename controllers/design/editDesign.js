import Constant from "../../models/constant.js";
import Design from "../../models/design.js";
import Size from "../../models/designSize.js";

export const editDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const design = await Design.findOne({ code: id });
    const size = await Size.find({ design: design._id });
    const sizeInputList = [
      ...new Set(req.body.data.sizeInput.map((item) => item.size)),
    ];
    const sizeList = size.map((item) => item.size);
    console.log(sizeInputList);
    const removeSize = sizeList.filter((item) => !sizeInputList.includes(item));
    const newSize = sizeInputList.filter((item) => !sizeList.includes(item));
    if (removeSize.length > 0) {
      //   await Size.deleteMany({ size: { $in: removeSize } });
    }
    if (newSize.length > 0) {
      const createSize = newSize.map((item) => ({
        design: design._id,
        size: item,
      }));
      //   await Size.insertMany(createSize);
    }

    const updateSize = "";
    res.status(200).json({ message: "success", id: id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
