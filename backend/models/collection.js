import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema(
  {
    name: String,
    slug: String,
  },
  { timestamps: true, collection: "collections" }
);
const CollectionModel = mongoose.model("Collection", collectionSchema);
export default CollectionModel;
