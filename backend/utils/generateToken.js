import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
const generateAccessToken = (user) => {
  // Lần đầu đăng nhập sẽ user._id các lần sau truy cập token sẽ là userId
  const userId = user._id ? user._id : user.userId;
  return jwt.sign(
    { userId: userId, name: user.name, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};
const generateRefreshToken = (user) => {
  const userId = user._id ? user._id : user.userId;
  return jwt.sign(
    { userId: userId, name: user.name, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
export { generateAccessToken, generateRefreshToken };
