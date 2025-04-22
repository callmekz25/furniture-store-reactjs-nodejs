import Category from "../models/category.model.js";

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ mess: "Not found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};
export { getCategories };
