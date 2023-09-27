import Design from "../../models/design.js";
import Size from "../../models/designSize.js";

export const getDesigns = async (req, res) => {
  const { search, page } = req.query;
  const limit = 20;
  try {
    const designs = await Design.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    const designId = designs.map((design) => design._id);
    const designSizes = await Size.find({
      designId: { $in: designId },
    });
    const designData = designs.map((design) => {
      const selectSize = designSizes.filter(
        (e) => e.design.toString() === design._id.toString()
      );
      return { ...design._doc, size: selectSize };
    });
    const total = await Design.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    console.log(designData);
    res.status(200).json({
      status: 200,
      data: designData,
      page: page,
    });
  } catch (error) {}
};

export const getDesignById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const design = await Design.findOne({ code: id });
    const size = await Size.find({ design: design._id });
    console.log(design);
    res.status(200).json({
      status: 200,
      data: { design, size },
    });
  } catch (error) {}
};
