import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        _id: false,
      },
    ],
  },
  { timestamps: true, collection: "carts" }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
