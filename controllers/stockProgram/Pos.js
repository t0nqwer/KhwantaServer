import Bill from "../../models/bill.js";
import Store from "../../models/store.js";

export const savebill = async (req, res) => {
  console.log(req.body, "savebill");
  const { storeName } = req.body;

  const app = await Store.findOne({ storeName: storeName });

  try {
    const data = {
      name: `${app.storeRandomId}-${req.body.name}`,
      date: req.body.date,
      products: req.body.products,
      CustomProducts: req.body.customProducts,
      Order: req.body.Order ? req.body.Order : null,
      payment: req.body.payment,
      totalBfDiscount: req.body.totalBfDiscount,
      disamout: req.body.amount,
      discount: req.body.distype,
      totalPay: req.body.totalPay,
      totalChange: req.body.change,
      distype: req.body.distype,
      store: app._id,
    };
    console.log(data, "data");

    const bill = new Bill(data);
    await bill.save();
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
