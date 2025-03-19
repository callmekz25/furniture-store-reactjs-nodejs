import Product from "../models/productModel.js";
import { uploadFilesToCloudinary } from "../services/cloudinary.js";
import Collection from "../models/collectionModel.js";
import Category from "../models/categoryModel.js";
import { LIMIT } from "../constants.js";
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
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
      query.brand = { $in: suppliersQueryArray };
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
        price: {
          $gte: min,
          $lte: max,
        },
      }));
    }
    let products = await Product.find(query)
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);

    // Cấu trúc query theo sort là key.asc hoặc key.desc
    if (sortsQuery) {
      const [key, type] = sortsQuery.split(".");
      const convertSortType = type === "asc" ? 1 : -1;
      products = await Product.find(query).sort({ [key]: convertSortType });
    }
    if (!products) {
      return res.status(404).json({ mess: "Không tìm thấy trang" });
    }
    return res.status(200).json({ products, type, suppliers });
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
      brand,
      discount: Number(discount),
      price: Number(discountPrice),
      fakePrice: Number(fakePrice),
      images: mainImages,
      quantity: Number(quantity),
      collection: JSON.parse(collection),
      category,
      slug: slug,
      publish: publish === "true",
      variants: parsedVariants,
    });
    await product.save();

    await product.save();
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
