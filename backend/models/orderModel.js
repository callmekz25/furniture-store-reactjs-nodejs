import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    note: String,
    userId: {
      type: String,
      default: null,
    },
    location: {
      address: String,
      province: String,
      district: String,
      ward: String,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Nháp",
    },
    products: [
      {
        productId: String,
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
