import { ACCESS_TOKEN, PRODUCTION_ENV, REFRESH_TOKEN } from "../constants.js";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service.js";
import { OkSuccess } from "../core/success.response.js";
import { JWT_SECRET } from "../constants.js";
import asyncHandler from "../helpers/asyncHandler.js";
class AuthController {
  static getUser = asyncHandler(async (req, res, next) => {
    const user = await AuthService.getUser(req.user?._id);
    return res
      .status(200)
      .json(new OkSuccess({ message: "Get user info successful", data: user }));
  });
  static register = asyncHandler(async (req, res, next) => {
    await AuthService.register(req.body);

    return res
      .status(200)
      .json(new OkSuccess({ message: "Register successfully!" }));
  });
  static login = asyncHandler(async (req, res, next) => {
    const user = await AuthService.login(req.body);

    const accessToken = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "2m",
      }
    );

    const refreshToken = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: PRODUCTION_ENV ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: PRODUCTION_ENV ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(
      new OkSuccess({
        message: "Login successfully",
        data: user,
      })
    );
  });
  static logout = asyncHandler(async (req, res, next) => {
    res.clearCookie(ACCESS_TOKEN, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "lax",
    });
    res.clearCookie(REFRESH_TOKEN, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json(new OkSuccess({ message: "Logout successfully" }));
  });
}

export default AuthController;
