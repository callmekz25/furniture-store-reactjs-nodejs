import Product from "../models/product.js";
import Review from "../models/review.js";

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
export { postReview };
