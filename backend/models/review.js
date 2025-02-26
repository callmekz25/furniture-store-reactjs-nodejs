import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    name: String,
    email: String,
    content: String,
    rating: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "reviews", // Gán tên collection cụ thể
  }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
