import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15s",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
export { generateAccessToken, generateRefreshToken };
