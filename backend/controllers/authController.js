import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./tokenController.js";
const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ mess: "Email đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ mess: "Đăng ký thành công" });
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ mess: "Email không tồn tại" });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ mess: "Mật khẩu không hợp lệ" });
    }

    const accessToken = generateAccessToken(user);

    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
export { SignUp, SignIn };
