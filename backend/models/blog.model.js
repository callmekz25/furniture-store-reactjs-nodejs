import mongoose from "mongoose";
import { Schema } from "mongoose";
const blogSchema = new Schema(
  {
    title: String,
    thumbnail: String,
    content: String,
    slug: String,
    tags: {
      type: [String],
      default: null,
    },
    category: String,
    publish: Boolean,
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
