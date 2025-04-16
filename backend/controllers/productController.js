import Product from "../models/productModel.js";
import { uploadFilesToCloudinary } from "../services/cloudinary.js";
import Collection from "../models/collectionModel.js";
import Category from "../models/categoryModel.js";
import { LIMIT } from "../constants.js";
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "Not found products" });
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const getProductsByCollection = async (req, res) => {
  try {
    const { slug } = req.params;
    const { limit } = req.query;
    let products = [];
    if (!limit) {
      products = await Product.find({
        publish: true,
        collection: { $in: slug },
      }).limit(8);
    }
    products = await Product.find({
      publish: true,
      collection: { $in: slug },
    }).limit(limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};
const getRelatedProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const { slug } = req.params;

    const product = await Product.findOne({
      publish: true,
      slug: slug,
    });
    const products = await Product.find({
      publish: true,
      $or: [
        { category: product.category },
        { collection: { $in: product.collection } },
      ],
    }).limit(limit);
    if (!products) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: "Product not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: "Product not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProductsByCollectionOrCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const suppliersQuery = req.query.supplier;
    const pricesQuery = req.query.price;
    const sortsQuery = req.query.sort;

    const page = req.query.page;
    // Loại tên của collection hoặc category theo slug
    let type = {};

    // Dùng để lấy ra các nhà cung cấp theo các sảm phẩm trong collection hoặc category
    let suppliers = [];
    let query = { publish: true };

    const collection = await Collection.findOne({ slug });
    const category = await Category.findOne({ slug });

    if (slug === "all") {
      suppliers = await Product.distinct("brand", {
        publish: true,
      });
      type = {
        name: "Tất cả sản phẩm",
      };
    }

    if (collection) {
      query.collection = collection.slug;
      suppliers = await Product.distinct("brand", {
        collection: collection.slug,
      });
      type = {
        name: collection.name,
      };
    }
    if (category) {
      query.category = category.slug;
      type = {
        name: category.name,
      };
      suppliers = await Product.distinct("brand", {
        category: category.slug,
      });
    }

    if (suppliersQuery) {
      const suppliersQueryArray = Array.isArray(suppliersQuery)
        ? suppliersQuery
        : [suppliersQuery];
      query.brand = { $in: suppliersQueryArray.map((s) => s.toUpperCase()) };
    }
    // Cấu trúc của query theo price là min-max
    if (pricesQuery) {
      const pricesQueryArray = Array.isArray(pricesQuery)
        ? pricesQuery
        : [pricesQuery];
      const pricesQueryArraySplit = pricesQueryArray.map((price) => {
        const [min, max] = price.split("-").map(Number);
        return { min, max };
      });
      query.$or = pricesQueryArraySplit.map(({ min, max }) => ({
        minPrice: {
          $gte: min,
          $lte: max,
        },
      }));
    }

    // Cấu trúc query theo sort là key.asc hoặc key.desc
    let sort = {};
    if (sortsQuery) {
      const [key, type] = sortsQuery.split(".");
      const sortKey = key === "price" ? "minPrice" : key;
      const convertSortType = type === "asc" ? 1 : -1;
      sort = { [sortKey]: convertSortType };
    }
    const totalProducts = await Product.countDocuments(query);
    let products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);
    if (!products) {
      return res.status(404).json({ message: "Không tìm thấy trang" });
    }

    return res
      .status(200)
      .json({ products, type, suppliers, total: totalProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      title,
      sku,
      status,
      brand,
      isNew,
      discount,
      fakePrice,
      quantity,
      descr,
      category,
      collection,
      publish,
      slug,
      variants,
    } = req.body;
    let discountPrice = fakePrice;

    let parsedVariants = JSON.parse(variants);
    if (parsedVariants.length > 0) {
      parsedVariants = parsedVariants.map((variant) => {
        return { ...variant, price: Number(variant.fakePrice) };
      });
    }

    let mainImages = [];

    if (discount) {
      discountPrice = fakePrice * (1 - Number(discount) / 100);
      if (parsedVariants.length > 0) {
        parsedVariants = parsedVariants.map((variant) => {
          return {
            ...variant,
            price: Number(variant.fakePrice) * (1 - Number(discount) / 100),
          };
        });
      }
    }

    if (req.files && req.files["productImages"]) {
      const uploadedImages = await uploadFilesToCloudinary(
        req.files["productImages"],
        "variants"
      );
      mainImages = uploadedImages;
    }
    if (req.files && req.files["variantImages"]) {
      let uploadedImages = await uploadFilesToCloudinary(
        req.files["variantImages"],
        "variants"
      );
      let imageIndex = 0;

      // Gán ảnh đã upload vào đúng variant
      parsedVariants.forEach((variant) => {
        if (variant.images.length > 0) {
          variant.images = uploadedImages.slice(
            imageIndex,
            imageIndex + variant.images.length
          );
          imageIndex += variant.images.length;
        }
      });
    }
    const product = new Product({
      title,
      sku,
      descr,
      status: status === "true",
      brand: brand.toUpperCase(),
      isNew: isNew === "true",
      discount: Number(discount),
      price: Number(discountPrice),
      fakePrice: Number(fakePrice),
      images: mainImages,
      quantity: Number(quantity),
      collection: JSON.parse(collection),
      minPrice:
        parsedVariants.length > 0
          ? Number(parsedVariants[0].price)
          : Number(discountPrice),
      category,
      slug: slug,
      publish: publish === "true",
      variants: parsedVariants,
    });
    await product.save();

    await product.save();
    return res
      .status(200)
      .json({ product, message: "Thêm sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ message: `Failed to add product ${error}` });
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
export {
  getProducts,
  getRelatedProducts,
  getProductById,
  getProductsByCollection,
  getProductsByCollectionOrCategory,
  getProductBySlug,
  addProduct,
  deleteProduct,
};
