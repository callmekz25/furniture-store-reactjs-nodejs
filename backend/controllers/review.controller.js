import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { OkSuccess } from "../core/success.response.js";
const postReview = async (req, res, next) => {
  try {
    const { name, email, content, rating, userId } = req.body;

    const { productId } = req.params;
    if (!name || !email || !content || !rating || !productId) {
      return res.status(401).json({ mess: "Thiếu trường dữ liệu" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ mess: "Email không hợp lệ" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ mess: "Không tìm thấy sản phẩm " });
    }
    const review = await Review.create({
      name,
      email,
      content,
      rating,
      userId: userId ?? null,
      productId,
    });
    await review.save();

    return res.status(200).json({ mess: "Gửi đánh giá thành công" });
  } catch (error) {
    return next(error);
  }
};

const getReviewsByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(401).json({ mess: "Thiếu trường dữ liệu" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ mess: "Không tìm thấy sản phẩm" });
    }
    const reviews = await Review.find({ productId: product._id }).populate(
      "userId",
      "name"
    );
    return res.status(200).json(new OkSuccess({ data: reviews }));
  } catch (error) {
    return next(error);
  }
};
export { postReview, getReviewsByProductId };
