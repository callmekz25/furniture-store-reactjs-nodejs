import Product from "../models/product.js";
import { uploadFilesToCloudinary } from "../services/cloudinary.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ publish: true });
    if (!products) {
      return res.status(404).json({ mess: "Not found products" });
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ mess: err.message });
  }
};
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ mess: "Product not found" });
  } catch (err) {
    return res.status(400).json({ mess: err.message });
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
      slug,
    } = req.body;

    const product = new Product({
      title,
      sku,
      descr,
      status: status === "true",
      brand,
      price: Number(price),
      fakePrice: Number(fakePrice),
      images: [],
      quantity: Number(quantity),
      collection,
      category,
      slug: slug,
      publish: publish === "true",
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
    return res.status(200).json({ product, mess: "Thêm sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ mess: `Failed to add product ${error}` });
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
export { getProducts, getProductBySlug, addProduct, deleteProduct };
