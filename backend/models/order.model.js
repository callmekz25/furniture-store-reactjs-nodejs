import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    order_code: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    order_info: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      note: { type: String, default: null },
      address: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },
    payment: {
      payment_status: { type: Boolean, default: false },
      payment_method: {
        type: String,
        enum: ["bank_transfer", "cod", "momo"],
        required: true,
      },
    },
    order_status: {
      type: String,
      default: "pending",
      required: true,
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
