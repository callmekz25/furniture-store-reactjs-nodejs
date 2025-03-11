import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    slug: String,
  },
  { timestamps: true, collection: "categories" }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
