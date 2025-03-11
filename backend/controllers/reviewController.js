import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

const postReview = async (req, res) => {
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
    return res.status(404).json({ mess: `${error}` });
  }
};

const getReviewsByProductId = async (req, res) => {
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
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ mess: "Lỗi server", error: error.message });
  }
};
export { postReview, getReviewsByProductId };
