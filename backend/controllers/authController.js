import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN, PRODUCTION_ENV, REFRESH_TOKEN } from "../constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
const getUser = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.userId);
      if (user) {
        return res.status(200).json({
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      }
    }
    return res.status(200).json(null);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
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
      secure: PRODUCTION_ENV,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      token: accessToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
const logOut = async (req, res) => {
  try {
    res.clearCookie(ACCESS_TOKEN, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "lax",
    });
    res.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "lax",
    });
    return res.status(200).json({ mess: "Đăng xuất thành công" });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};

export { signUp, signIn, logOut, getUser };
