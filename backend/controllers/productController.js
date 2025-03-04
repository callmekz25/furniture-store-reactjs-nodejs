import Product from "../models/product.js";
import { uploadFilesToCloudinary } from "../services/cloudinary.js";
import Collection from "../models/collection.js";
import Category from "../models/category.js";
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

const getProductsByCollectionOrCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const categories = req.query.category;

    let type = {};
    let products = [];
    if (!slug) {
      products = await Product.find({ publish: true });
    }
    const collection = await Collection.findOne({ slug });
    const category = await Category.findOne({ slug });

    if (collection) {
      products = await Product.find({ collection: collection.slug });
      type = {
        name: collection.name,
      };
    }
    if (category) {
      products = await Product.find({ category: category.slug });
      type = {
        name: category.name,
      };
    }
    let categoriesArray;
    if (categories) {
      categoriesArray = Array.isArray(categories) ? categories : [categories];
      products = await Product.find({
        category: { $in: categoriesArray },
      });
    }

    if (products.length === 0) {
      return res.status(404).json({ mess: "Không tìm thấy trang" });
    }
    return res.status(200).json({ products, type });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
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
export {
  getProducts,
  getProductsByCollectionOrCategory,
  getProductBySlug,
  addProduct,
  deleteProduct,
};
