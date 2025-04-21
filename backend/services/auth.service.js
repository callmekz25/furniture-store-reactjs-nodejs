import User from "../models/user.model.js";
import { findUserByEmail } from "../repos/auth.repo.js";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN, PRODUCTION_ENV, REFRESH_TOKEN } from "../constants.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
class AuthService {
  static getUser = async (userId) => {
    const user = await User.findById(userId);
    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  };
  static register = async ({ email, password, name }) => {
    const user = await findUserByEmail(email);
    if (user) {
      throw new Error("Existing email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
  };
  static login = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new Error("Incorrect password");
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
  };
}
export default AuthService;
