import Category from "../models/category.js";

const getCategories = async (req, res) => {
  try {
    let categories = [];
    categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({ mess: "Not found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
export { getCategories };
