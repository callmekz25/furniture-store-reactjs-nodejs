import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    titleNoAccent: String,
    sku: String,
    brand: String,
    price: Number,
    images: [String],
    quantity: Number,
    category: String,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    descr: String,
    publish: Boolean,
    slug: String,
    variants: [
      {
        status: { type: Boolean, default: true },
        sku: String,
        name: String,
        images: [String],
        price: { type: Number, default: 0 },
        quantity: Number,
        attributes: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
