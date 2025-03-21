import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    sku: String,
    status: Boolean,
    brand: String,
    price: Number,
    fakePrice: Number,
    isNew: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    images: [String],
    quantity: Number,
    category: String,
    collection: [String],
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
        fakePrice: { type: Number, default: 0 },
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
