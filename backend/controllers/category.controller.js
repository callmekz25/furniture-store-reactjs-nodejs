import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import Category from "../models/category.model.js";

const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(new OkSuccess({ data: categories }));
});
export { getCategories };
