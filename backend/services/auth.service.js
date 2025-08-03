import User from "../models/user.model.js";
import { findUserByEmail } from "../repos/auth.repo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
import {
  AuthFailureError,
  ConflictRequestError,
  ForbiddenError,
  NotFoundError,
} from "../core/error.response.js";
import EmailService from "./email.service.js";
class AuthService {
  static register = async ({ email, password, name }) => {
    const user = await findUserByEmail(email);
    if (user) {
      throw new ConflictRequestError("Email đã được sử dụng");
    } else if (user?.isVerified) {
      throw new ConflictRequestError("Email đã được xác thực");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        email: email,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    await EmailService.sendVerificationEmail(email, token);
  };
  static verifyEmail = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw NotFoundError("Không tìm thấy tài khoản");
    }
    user.isVerified = true;
    user.save();
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
    if (!user.isVerified) {
      throw new ForbiddenError("Email chưa được xác thực");
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  };
}
export default AuthService;
