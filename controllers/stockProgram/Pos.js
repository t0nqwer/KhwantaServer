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
      Order: req.body.Order,
      payment: req.body.payment,
      totalBfDisocunt: req.body.totalBfDiscount,
      discount: req.body.distype,
      total: req.body.total,
      totalPaid: req.body.totalPaid,
      totalChange: req.body.totalChange,
      discountType: req.body.discountType,
      store: req.body.store,
      customer: req.body.customer,
    };
    console.log(data, "data");
    // const newBill = new Bill({
    //   name: `${app.storeRandomId}${req.body.name}`,
    // });
    throw new Error("Error");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
