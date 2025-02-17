import Product from "../models/product.js";

const getProducts = async (req, res) => {
  try {
    return res.status(200).json({ mess: "Fake data" });
  } catch (err) {
    return res.status(400).json({ mess: err.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    }
    res.status(404).json({ message: "Product not found" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const addProduct = async (req, res) => {
  try {
    const { name } = req.body;

    const product = new Product({
      name: name,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add product", message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Not found product!" });
    }
    res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {}
};
export { getProducts, getProductById, addProduct, deleteProduct };
