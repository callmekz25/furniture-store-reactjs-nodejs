import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "15s",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};
export { generateAccessToken, generateRefreshToken };
