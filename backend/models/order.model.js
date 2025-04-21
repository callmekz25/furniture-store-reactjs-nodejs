import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    note: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    shipping: {
      name: String,
      email: String,
      phoneNumber: String,
      address: String,
      province: String,
      district: String,
      ward: String,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    paymentMethod: { type: String, default: "" },
    status: {
      type: String,
      default: "Nháp",
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
    total_price: { type: Number, default: 0 },
    total_items: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
