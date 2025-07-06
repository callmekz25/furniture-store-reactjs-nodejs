import mongoose from "mongoose";
import { PRODUCTION_ENV } from "../constants.js";
const guestCartSessionMiddleware = async (req, res, next) => {
  let cartId = req.cookies.cartId;
  if (req.user) {
    req.cartId = null;
    return next();
  }
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("PRODUCTION_ENV:", PRODUCTION_ENV);
  if (!cartId) {
    cartId = new mongoose.Types.ObjectId().toString();
    res.cookie("cartId", cartId, {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: PRODUCTION_ENV ? "none" : "lax",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });
  }

  req.cartId = cartId;
  return next();
};
export default guestCartSessionMiddleware;
