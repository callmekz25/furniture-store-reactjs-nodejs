import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    orderCode: { type: String, default: null },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    orderInfo: {
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
      paymentStatus: { type: Boolean, default: false },
      paymentMethod: {
        type: String,
        enum: ["bank_transfer", "cod", "momo", null],
        default: null,
      },
    },
    orderStatus: {
      type: String,
      default: "draft",
      enum: [
        "draft",
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
        finalPrice: Number,
        promotion: {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "Promotion" },
          name: String,
          descr: String,
          discountValue: Number,
        },
        attributes: { type: Object, default: null },
        _id: false,
      },
    ],
    totalPrice: { type: Number, default: 0, required: true },
    totalItems: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
