import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    order_code: { type: String, default: null },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    order_info: {
      name: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
      note: { type: String, default: null },
      address: { type: String },
      province: { type: String },
      district: { type: String },
      ward: { type: String },
    },
    payment: {
      payment_status: { type: Boolean, default: false },
      payment_method: {
        type: String,
        enum: ["bank_transfer", "cod", "momo", "draft"],
        default: "draft",
      },
    },
    order_status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "confirmed",
        "shipping",
        "delivered",
        "canceled",
        "returned",
        "failed",
      ],
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        slug: String,
        image: String,
        title: String,
        quantity: Number,
        price: Number,
        fakePrice: Number,
        discount: Number,
        attributes: { type: [String], default: [] },
        _id: false,
      },
    ],
    total_price: { type: Number, default: 0, required: true },
    total_items: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
