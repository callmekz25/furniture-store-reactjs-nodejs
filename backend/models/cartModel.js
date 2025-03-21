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
  },
  { timestamps: true, collection: "carts" }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
