import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, JWT_SECRET, PRODUCTION_ENV } from "../constants.js";

const optionalMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!token && !refreshToken) {
    req.user = null;
    console.log("Token not found");

    return next();
  }

  // Check and verify access token
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;

    return next();
  } catch (err) {
    // Access token is not valid or expired

    if (!refreshToken) {
      req.user = null;

      return next();
    }

    try {
      // refresh token is valid, create new access token

      const user = jwt.verify(refreshToken, JWT_SECRET);
      const { exp, iat, ...payload } = user;
      console.log(user);

      const newAccessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1m",
      });
      console.log("New access token created");
      res.cookie(ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: PRODUCTION_ENV,
        sameSite: PRODUCTION_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
      });

      req.user = user;
      return next();
    } catch (refreshErr) {
      req.user = null;
      return next();
    }
  }
};

export default optionalMiddleware;
