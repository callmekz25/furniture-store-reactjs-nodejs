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
    addresses: [
      {
        name: String,
        address: String,
        province: {
          id: String,
          name: String,
        },
        district: {
          id: String,
          name: String,
        },
        ward: {
          id: String,
          name: String,
        },
        phoneNumber: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
const User = mongoose.model("User", userSchema);
export default User;
