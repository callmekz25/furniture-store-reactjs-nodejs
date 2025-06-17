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
      name: { type: String, default: null },
      email: { type: String, default: null },
      phoneNumber: { type: String, default: null },
      note: { type: String, default: null },
      address: { type: String, default: null },
      province: { type: String, default: null },
      district: { type: String, default: null },
      ward: { type: String, default: null },
    },
    payment: {
      payment_status: { type: Boolean, default: false },
      payment_method: {
        type: String,
        enum: ["bank_transfer", "cod", "momo", null],
        default: null,
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
        attributes: { type: Object, default: null },
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
