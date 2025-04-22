import { JWT_SECRET } from "../constants.js";
import { ForbiddenError } from "../core/error.response.js";
import { ACCESS_TOKEN, PRODUCTION_ENV } from "../constants.js";
import jwt from "jsonwebtoken";
import { OkSuccess } from "../core/success.response.js";
class TokenController {
  static refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ForbiddenError();
      }
      const user = jwt.verify(refreshToken, JWT_SECRET);
      const accessToken = jwt.sign(user, JWT_SECRET, {
        expiresIn: "15m",
      });
      res.cookie(ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: PRODUCTION_ENV,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });
      return res
        .status(200)
        .json(new OkSuccess({ message: "Refresh token successful" }));
    } catch (error) {
      console.log(error);
      return next(new ForbiddenError("Refresh token expired"));
    }
  };
}
export default TokenController;
