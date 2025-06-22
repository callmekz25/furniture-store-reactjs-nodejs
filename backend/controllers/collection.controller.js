import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import Collection from "../models/collection.model.js";

const getCollections = asyncHandler(async (req, res, next) => {
  const collections = await Collection.find().sort({ name: 1 });
  if (!collections) {
    return res.status(404).json({ message: "Không tìm thấy collections" });
  }
  return res.status(200).json(new OkSuccess({ data: collections }));
});
export { getCollections };
