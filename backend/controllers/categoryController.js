import Category from "../models/categoryModel.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ mess: "Not found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
export { getCategories };
