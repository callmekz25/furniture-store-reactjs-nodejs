import Collection from "../models/collection.model.js";
import Product from "../models/product.model.js";
import { uploadFilesToCloudinary } from "./cloudinary.js";
import {
  findSuppliersAndNameByCollectionSlug,
  findTotalProductsByQuery,
  findProductsByQuery,
  findProductsByCollection,
} from "../repos/product.repo.js";
import buildQueryProduct from "../utils/build-query-products.js";
import buildSortObject from "../utils/build-sort-object.js";
import normalizeText from "../utils/normalize-text.js";
import { BadRequestError, NotFoundError } from "../core/error.response.js";
import { GEMINI_API_KEY, LIMIT } from "../constants.js";
import { GoogleGenAI } from "@google/genai";
import cosineSimilarity from "../utils/cosinse-similariry.js";
import attachPromotions from "../helpers/attachPromotions.js";
class ProductService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);
  static getAllProducts = async (query) => {
    let select = "";
    if (query) {
      if (Array.isArray(query)) {
        select = query.join(" ");
      } else {
        select = query;
      }
    }
    const products = await Product.find()
      .select(select)
      .populate("collections")
      .lean();
    if (!products) {
      throw new NotFoundError("Not found product");
    }
    const productsWithPromotion = await attachPromotions(products);
    return productsWithPromotion;
  };
  static getPublishedProducts = async () => {
    const products = await Product.find({ publish: true }).lean();
    return products;
  };
  static addProduct = async (product, files) => {
    const {
      title,
      sku,
      brand,
      quantity,
      descr,
      price,
      category,
      collections,
      publish,
      slug,
      variants,
    } = product;

    let parsedVariants = JSON.parse(variants);
    if (parsedVariants.length > 0) {
      parsedVariants = parsedVariants.map((variant) => {
        return { ...variant, price: Number(variant.price) };
      });
    }

    let mainImages = [];

    // Upload image to cloudinary
    if (files && files["productImages"]) {
      const uploadedImages = await uploadFilesToCloudinary(
        files["productImages"],
        "variants"
      );
      mainImages = uploadedImages;
    }
    if (files && files["variantImages"]) {
      let uploadedImages = await uploadFilesToCloudinary(
        files["variantImages"],
        "variants"
      );
      let imageIndex = 0;

      // image url for variants
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
    const newProduct = new Product({
      title,
      sku,
      descr,
      brand: brand.toUpperCase(),
      price: price ? Number(price) : 0,
      images: mainImages,
      quantity: quantity ? Number(quantity) : 0,
      collections: JSON.parse(collections),
      category,
      slug: slug,
      publish: publish === "true",
      variants: parsedVariants,
    });
    await newProduct.save();
    return newProduct;
  };

  static updateProduct = async (id, collections) => {
    const product = await Product.findById(id);
    if (!product) {
      throw new NotFoundError("Not found product");
    }
    product.collection = collections;
    await product.save();
    return product;
  };

  static deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
  };

  static getRelatedProducts = async (id) => {
    const product = await Product.findById(id).lean();
    if (!product) {
      throw new NotFoundError("Not found product");
    }
    const products = await Product.find({
      _id: { $ne: product._id },
      embedding: { $exists: true },
    }).lean();
    // Calc score of embedding to get top products
    const related = products
      .map((p) => ({
        ...p,
        score: cosineSimilarity(product.embedding, p.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ score, ...rest }) => rest);

    return related;
  };
  static getProductBySlug = async (slug) => {
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      throw new NotFoundError("Not found product");
    }
    const productWithPromotion = await attachPromotions(product);
    return productWithPromotion;
  };
  static getProductsBySearchTerm = async (query) => {
    const { q, page } = query;

    const convertQuery = normalizeText(q).trim().split(" ").join(".*");
    const [products, total] = await Promise.all([
      page > 0
        ? Product.find({
            titleNoAccent: { $regex: convertQuery, $options: "i" },
          })
            .skip((page - 1) * LIMIT)
            .limit(LIMIT)
            .lean()
        : Product.find({
            titleNoAccent: { $regex: convertQuery, $options: "i" },
          })
            .limit(4)
            .lean(),
      Product.countDocuments({
        titleNoAccent: { $regex: convertQuery, $options: "i" },
      }),
    ]);
    if (!products) {
      throw new NotFoundError("Not found product");
    }
    const productsWithPromotion = await attachPromotions(products);
    return { products: productsWithPromotion, total };
  };
  static getProductById = async (productId) => {
    const product = await Product.findById(productId)
      .populate("collections")
      .lean();
    if (!product) {
      throw new NotFoundError("Not found product");
    }
    const productWithPromotion = await attachPromotions(product);
    return productWithPromotion;
  };

  static getProductsByCollection = async (collectionSlug, limit) => {
    const collection = await Collection.findOne({
      slug: collectionSlug,
    }).lean();
    if (!collection) {
      throw new NotFoundError("Not found collection");
    }
    const [products, total] = await Promise.all([
      findProductsByCollection(collection, limit),
      Product.countDocuments({
        collections: { $in: collection._id },
      }),
    ]);
    if (!products) {
      throw new NotFoundError("Not found product");
    }
    const productsWithPromotion = await attachPromotions(products);
    return {
      products: productsWithPromotion,
      total,
    };
  };
  static getProductListByCollectionName = async ({
    slug,
    priceQuery,
    page,
    sortQuery,
    supplierQuery,
  }) => {
    const collection = await Collection.findOne({ slug }).lean();
    if (!collection) {
      throw new NotFoundError("Not found collection");
    }
    let { query, type, suppliers } = await findSuppliersAndNameByCollectionSlug(
      {
        collectionSlug: slug,
        collection,
      }
    );

    if (query === null) {
      throw new NotFoundError("Not found");
    }
    if (supplierQuery || priceQuery) {
      const updateQuery = buildQueryProduct({
        query,
        supplierQuery,
        priceQuery,
      });
      query = { ...query, ...updateQuery };
    }

    const sort = buildSortObject(sortQuery);
    const [total, products] = await Promise.all([
      findTotalProductsByQuery(query),
      findProductsByQuery({ query, page, sort }),
    ]);
    if (!products) {
      throw new NotFoundError("Not found product");
    }
    const productsWithPromotion = await attachPromotions(products);
    return { products: productsWithPromotion, type, suppliers, total };
  };
  static generateEmbedding = async () => {
    const collections = await Collection.find().lean();

    if (!collections) {
      throw new NotFoundError("Not found collection");
    }
    const products = await Product.find({
      publish: true,
      embedding: { $exists: false },
    }).populate("collections");
    for (const product of products) {
      const collectionNames = product.collections
        .map((c) => {
          return c.name;
        })
        .filter(Boolean);

      const content = `
      Tên sản phẩm: ${product.title}
      Mô tả chi tiết: ${product.descr || "Chưa có chi tiết mô tả"}
      Nhà cung cấp: ${product.brand}
      Loại sản phẩm: ${collectionNames.join(", ")}
     `;
      const response = await ProductService.ai.models.embedContent({
        model: "embedding-001",
        contents: content,
        config: {
          taskType: "SEMANTIC_SIMILARITY",
        },
      });
      const embeddings = await response.embeddings?.[0]?.values;
      if (!embeddings || !Array.isArray(embeddings)) {
        throw new Error("Failed to generate valid embedding");
      }
      product.embedding = embeddings;
      await product.save();
    }
  };
}

export default ProductService;
