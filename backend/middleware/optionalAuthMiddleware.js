import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, JWT_SECRET } from "../constants.js";
import { generateAccessToken } from "../utils/generateToken.js";

const optionalAuthMiddleware = (req, res, next) => {
  // Lấy token từ cookies
  const token = req.cookies.accessToken;

  // Nếu không có access token, kiểm tra refresh token
  if (!token) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(); // Không có token nào, tiếp tục
    }

    // Kiểm tra refresh token
    try {
      const user = jwt.verify(refreshToken, JWT_SECRET);
      const newAccessToken = generateAccessToken(user);

      res.cookie(ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      req.user = user;
      return next();
    } catch (err) {
      return next(); // Refresh token không hợp lệ, tiếp tục
    }
  }

  // Kiểm tra access token
  try {
    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    return next();
  } catch (err) {
    // Access token không hợp lệ, kiểm tra refresh token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(); // Không có refresh token, tiếp tục
    }

    try {
      const user = jwt.verify(refreshToken, JWT_SECRET);
      const newAccessToken = generateAccessToken(user);

      res.cookie(ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      req.user = user;

      return next();
    } catch (refreshErr) {
      return next(); // Refresh token không hợp lệ, tiếp tục
    }
  }
};

export default optionalAuthMiddleware;
