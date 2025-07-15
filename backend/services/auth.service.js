import User from "../models/user.model.js";
import { findUserByEmail } from "../repos/auth.repo.js";
import bcrypt from "bcryptjs";

import {
  AuthFailureError,
  ConflictRequestError,
  NotFoundError,
} from "../core/error.response.js";
class AuthService {
  static getUser = async (userId) => {
    let userInfo = null;
    if (userId) {
      const user = await User.findById(userId);
      userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
    return userInfo;
  };
  static register = async ({ email, password, name }) => {
    const user = await findUserByEmail(email);
    if (user) {
      throw new ConflictRequestError("Email đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
  };
  static login = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new NotFoundError("Tài khoản không tồn tại");
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new AuthFailureError("Mật khẩu không đúng");
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  };
}
export default AuthService;
