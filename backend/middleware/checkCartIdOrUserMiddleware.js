import mongoose from "mongoose";
const checkCartIdOrUserMiddleware = async (req, res, next) => {
  let cartId = req.cookies.cartId;
  if (req.user) {
    return next();
  }

  if (!cartId) {
    cartId = new mongoose.Types.ObjectId().toString(); // Tạo ID ngẫu nhiên
    res.cookie("cartId", cartId, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    }); // Lưu vào cookies
  }

  req.cartId = cartId;
  return next();
};
export default checkCartIdOrUserMiddleware;
