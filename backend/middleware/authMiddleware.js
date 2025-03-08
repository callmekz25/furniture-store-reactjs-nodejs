import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, JWT_SECRET } from "../constants.js";
import { generateAccessToken } from "../utils/generateToken.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // Không có access token & refresh token
  if (!token && !refreshToken) {
    req.user = null; // Không có user
    return next(); // Cho phép request tiếp tục mà không có user
  }

  // Kiểm tra access token
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    // Access token không hợp lệ, kiểm tra refresh token
    if (!refreshToken) {
      req.user = null;
      return next(); // Không có refresh token, tiếp tục mà không có user
    }

    try {
      const user = jwt.verify(refreshToken, JWT_SECRET);
      const newAccessToken = generateAccessToken(user);
      console.log("New access token");

      res.cookie(ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      req.user = user;
      return next();
    } catch (refreshErr) {
      return res.status(401).json({ mess: "Unauthorized" }); //  Refresh token cũng hết hạn
    }
  }
};

export default authMiddleware;
