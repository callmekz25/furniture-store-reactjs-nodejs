import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  AuthFailureError,
  ConflictRequestError,
  ForbiddenError,
  NotFoundError,
} from "../core/error.response.js";
import EmailService from "./email.service.js";
import { generateOTP } from "../utils/generate-otp.js";
class AuthService {
  static register = async ({ email, password, name }) => {
    const user = await User.findOne({ email: email }).lean();
    if (user) {
      throw new ConflictRequestError("Email đã được sử dụng");
    }
    const { otp, expiresAt } = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otpHashed = await bcrypt.hash(otp, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailVerification: {
        otp: otpHashed,
        expiresAt: expiresAt,
      },
    });
    await newUser.save();

    await EmailService.sendVerificationEmail(email, otp);
  };

  static resendVerificationEmail = async (email) => {
    const user = await User.findOne({ email: email, isVerified: false });
    if (!user) {
      throw new NotFoundError("Tài khoản không tồn tại");
    }
    const { otp, expiresAt } = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const otpHashed = await bcrypt.hash(otp, salt);
    user.set({
      emailVerification: {
        otp: otpHashed,
        expiresAt,
      },
    });
    await user.save();
    await EmailService.sendVerificationEmail(email, otp);
  };

  static verifyEmail = async (payload) => {
    const { email, otp } = payload;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundError("Tài khoản không tồn tại");
    } else if (user.isVerified) {
      throw new ConflictRequestError("Email đã được xác thực rồi");
    }

    const now = new Date();

    if (now > user.emailVerification.expiresAt) {
      throw new ConflictRequestError("Mã xác thực đã hết hạn");
    }
    const isMatchOtp = await bcrypt.compare(otp, user.emailVerification.otp);
    if (!isMatchOtp) {
      throw new ConflictRequestError("Mã xác thực không đúng");
    }
    user.isVerified = true;
    user.emailVerification = null;
    await user.save();
  };
  static login = async ({ email, password }) => {
    const user = await await User.findOne({ email: email }).lean();
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
