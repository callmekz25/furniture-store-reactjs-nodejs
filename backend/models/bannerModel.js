import mongoose from "mongoose";
import { Schema } from "mongoose";
const bannerSchema = new Schema(
  {
    name: String,
    slug: String,
    image: String,
    type: String,
    priority: Number,
  },
  {
    timestamps: true,
    collection: "banners",
  }
);
const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
