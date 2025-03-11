import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    sku: String,
    status: Boolean,
    brand: String,
    price: Number,
    fakePrice: Number,
    images: [String],
    quantity: Number,
    category: String,
    collection: [String],
    descr: String,
    publish: Boolean,
    slug: String,
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
