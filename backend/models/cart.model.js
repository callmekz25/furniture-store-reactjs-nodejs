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
        sku: String,
        image: String,
        title: String,
        collections: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
        ],
        quantity: Number,
        price: Number,
        attributes: { type: Object, default: null },
        _id: false,
      },
    ],
  },
  { timestamps: true, collection: "carts" }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
