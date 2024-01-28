import Customer from "../../models/customer.js";
import CustomerIdCounter from "../../models/Counter/customerIdCounter.js";

export const getAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const {
    thaifirstname,
    thailastname,
    engfirstname,
    englastname,
    gender,
    birthday,
    detail,
    phone,
    address,
    email,
    lineid,
    facebook,
    instagram,
  } = req.body;
  const latestID = await CustomerIdCounter.findOne().sort({ CustomerId: -1 });
  console.log(latestID);
  const newID = latestID.CustomerId + 1;
  const newIDString = (newID + 100000 + "").slice(-5);
  await CustomerIdCounter.create({ CustomerId: newID });
  const newCustomer = new Customer({
    CustomerId: newIDString,
    firstName: thaifirstname,
    lastName: thailastname,
    EngfirstName: engfirstname,
    EnglastName: englastname,
    address: address,
    phone: phone,
    email: email,
    note: detail,
    LineId: lineid,
    FaceBookProfile: facebook,
    InstagramProfile: instagram,
    gender,
    birthday,
  });

  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOne({ _id: id });
    console.log(customer);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateCustomer = async (req, res) => {};
export const deleteCustomer = async (req, res) => {};
