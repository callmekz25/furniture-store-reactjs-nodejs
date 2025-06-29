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
        attributes: { type: Object, default: null },
        _id: false,
      },
    ],
    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "carts" }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
