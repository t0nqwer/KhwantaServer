import Design from "../../models/design.js";
import Size from "../../models/designSize.js";

export const getDesigns = async (req, res) => {
  const { search, page } = req.query;
  const limit = 20;
  try {
    console.log(search);
    Design.createIndexes({
      name: "text",
      description: "text",
      code: "text",
      brand: "text",
      pattern: "text",
      category: "text",
    });
    const designs = await Design.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { pattern: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
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
        { code: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { pattern: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    })
      .count()
      .exec();

    res.status(200).json({
      status: 200,
      data: designData,
      page: Math.ceil(total / 20),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getDesignById = async (req, res) => {
  const { id } = req.params;
  try {
    const design = await Design.findOne({ code: id });
    const size = await Size.find({ design: design._id });

    console.log(design, size);
    res.status(200).json({
      status: 200,
      data: { design, size },
    });
  } catch (error) {}
};
