import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "users", // Gán tên collection cụ thể
  }
);
const User = mongoose.model("User", userSchema);
export default User;
