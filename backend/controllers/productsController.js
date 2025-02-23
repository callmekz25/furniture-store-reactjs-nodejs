import Product from "../models/product.js";
import { uploadFilesToCloudinary } from "../services/cloudinary.js";

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
    const {
      title,
      sku,
      status,
      brand,
      price,
      fakePrice,
      quantity,
      descr,
      category,
      collection,
      publish,
    } = req.body;

    const product = new Product({
      title,
      sku,
      descr,
      status,
      brand,
      price,
      fakePrice,
      images: [],
      quantity,
      collection,
      category,
      publish,
    });
    await product.save();
    const productId = product._id.toString();
    if (req.files) {
      const uploadedImages = await uploadFilesToCloudinary(
        req.files,
        productId
      );
      product.images = uploadedImages;
      await product.save();
    }
    res.status(200).json({ product, mess: "Add successfully" });
  } catch (error) {
    res.status(400).json({ mess: `Failed to add product ${error}` });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ mess: "Not found product!" });
    }
    res.status(200).json({ mess: "Delete successfully!" });
  } catch (error) {}
};
export { getProducts, getProductById, addProduct, deleteProduct };
