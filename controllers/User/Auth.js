import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import Employee from "../../models/employee.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SECRET = "dfg5M1!67D#fFJhlpLULwu^";
const createToken = (id) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  console.log(Math.floor(tomorrow / 1000));
  return sign({ id }, SECRET, {
    expiresIn: Math.floor(tomorrow / 1000) - Math.floor(today / 1000),
  });
};

export const Register = async (req, res) => {
  const { frist_thai, frist_eng, last_thai, last_eng, birthday } = req.body;

  try {
    const password = birthday.replace("-", "").replace("-", "");
    console.log(password);
    const birth = new Date(birthday);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await Employee.create({
      firstname: frist_eng,
      lastname: last_eng,
      thaifirstname: frist_thai,
      thailastname: last_thai,
      username: `${frist_eng} ${last_eng}`,
      password: hash,
      birthday: birth,
    });
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await Employee.findOne({ username });

    if (!findUser) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(findUser._id);
    res.status(200).json({ user: findUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
