import Collection from "../models/collection.model.js";
import Product from "../models/product.model.js";
import { uploadFilesToCloudinary } from "./cloudinary.js";
import {
  findProductsByCollection,
  findSuppliersAndNameBySlug,
  findTotalProductsByQuery,
  findProductsByQuery,
} from "../repos/product.repo.js";
import buildQueryProduct from "../utils/buildQueryProduct.js";
import buildSortObject from "../utils/buildSortObject.js";
import normalizeText from "../utils/normalizeText.js";
import { BadRequestError, NotFoundError } from "../core/error.response.js";
import { GEMINI_API_KEY, LIMIT } from "../constants.js";
import { GoogleGenAI } from "@google/genai";
import cosineSimilarity from "../utils/cosinse-similariry.js";
import CollectionModel from "../models/collection.model.js";
class ProductService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);
  static getAllProducts = async () => {
    const products = await Product.find();
    return products;
  };
  static addProduct = async (product) => {
    if (!product) {
      throw new BadRequestError("Missing product");
    }
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
    } = product;
    let discountPrice = fakePrice;

    let parsedVariants = JSON.parse(variants);
    if (parsedVariants.length > 0) {
      parsedVariants = parsedVariants.map((variant) => {
        return { ...variant, price: Number(variant.fakePrice) };
      });
    }

    let mainImages = [];
    // Calculate discount for variants of product
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
    // Upload image to cloudinary
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
    if (!productId) {
      throw new BadRequestError("Missing require fields");
    }
    return await Product.findByIdAndDelete(productId);
  };

  static getRelatedProducts = async (id) => {
    if (!id) {
      throw new BadRequestError("Missing id");
    }
    const product = await Product.findById(id);
    // use lean to get object dont need to update instead of documents
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
    const product = await Product.findOne({ slug });
    return product;
  };
  static getProductsBySearchTerm = async (query) => {
    const { q, page } = query;
    if (!q) {
      throw new BadRequestError("Missing require data");
    }

    const convertQuery = normalizeText(q).trim().split(" ").join(".*");
    const [products, total] = await Promise.all([
      page > 0
        ? Product.find({
            titleNoAccent: { $regex: convertQuery, $options: "i" },
          })
            .skip((page - 1) * LIMIT)
            .limit(LIMIT)
        : Product.find({
            titleNoAccent: { $regex: convertQuery, $options: "i" },
          }).limit(4),
      Product.countDocuments({
        titleNoAccent: { $regex: convertQuery, $options: "i" },
      }),
    ]);
    return { products, total };
  };
  static getProductById = async (productId) => {
    if (!productId) {
      throw new BadRequestError("Missing require fields");
    }
    const product = await Product.findById(productId);
    return product;
  };

  static getProductsByCollection = async (collection, limit) => {
    if (!collection) {
      throw new BadRequestError("Missing require fields");
    }
    const [products, total] = await Promise.all([
      findProductsByCollection(collection, limit),
      Product.countDocuments({
        collection: { $in: collection },
      }),
    ]);
    return {
      products,
      total,
    };
  };
  static getProductListBySlug = async ({
    slug,
    priceQuery,
    page,
    sortQuery,
    supplierQuery,
  }) => {
    if (!slug) {
      throw new BadRequestError("Missing require fields");
    }
    const collection = await Collection.findOne({ slug });

    let { query, type, suppliers } = await findSuppliersAndNameBySlug({
      slug,
      collection,
    });

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
    return { products, type, suppliers, total };
  };
  static generateEmbedding = async () => {
    const collections = await CollectionModel.find();
    const products = await Product.find({
      publish: true,
      embedding: { $exists: false },
    });
    for (const product of products) {
      const collectionNames = product.collection
        .map((c) => {
          const match = collections.find((cl) => cl.slug === c);
          return match?.name;
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
