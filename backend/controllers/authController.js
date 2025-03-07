import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
const signUp = async (req, res) => {
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
const signIn = async (req, res) => {
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

    const refreshToken = generateRefreshToken(user);
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // Ngăn chặn CSRF
      maxAge: 15 * 60 * 1000, // 15 phút
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      token: accessToken,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ mess: "Unauthorized " });
  }
  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    // Hết hạn hoặc lỗi
    if (err) {
      return res.status(403).json({ mess: "Forbidden" });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie(ACCESS_TOKEN, newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      // maxAge: 15 * 60 * 1000, // 15 phút
    });
    console.log("Access Token new");

    return res.status(200).json({ accessToken: newAccessToken });
  });
};
export { signUp, signIn, refreshToken };
