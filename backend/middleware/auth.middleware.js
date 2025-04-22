import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";
import { AuthFailureError, ForbiddenError } from "../core/error.response.js";

// Middleware require user login
const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // Not found access token & refresh token will return 403 and axios will auto logout and redirect to login page
  if (!token && !refreshToken) {
    req.user = null;
    return next(new ForbiddenError());
  }

  // Verify access token if it expired then return 401 and axios will call refresh token
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    return next(new AuthFailureError());
  }
};

export default authMiddleware;
