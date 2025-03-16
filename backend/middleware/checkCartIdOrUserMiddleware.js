import mongoose from "mongoose";
import { PRODUCTION_ENV } from "../constants.js";
const checkCartIdOrUserMiddleware = async (req, res, next) => {
  let cartId = req.cookies.cartId;
  if (req.user) {
    return next();
  }

  if (!cartId) {
    cartId = new mongoose.Types.ObjectId().toString();
    res.cookie("cartId", cartId, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: "Strict",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });
  }

  req.cartId = cartId;
  return next();
};
export default checkCartIdOrUserMiddleware;
