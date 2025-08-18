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
import OrderService from "../services/order.service.js";
import CartService from "../services/cart.service.js";
import attachPromotions from "../helpers/attachPromotions.js";
import PineconeService from "./pinecone.service.js";
class ProductService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);

  static getProducts = async ({
    filter = {},
    sort = { createdAt: -1, updatedAt: -1 },
    limit,
    select,
    populate = ["collections"],
  }) => {
    let selectStr = "";

    if (Array.isArray(select)) {
      selectStr = select.join(" ");
    } else if (typeof select === "string") {
      selectStr = select;
    }
    if (filter.quantity !== undefined) {
      const stock = filter.quantity;
      const { quantity, ...rest } = filter;
      filter = {
        ...rest,
        $or: [
          { variants: { $elemMatch: { quantity: { $lt: stock } } } },
          {
            $and: [
              {
                $or: [
                  { variants: { $exists: false } },
                  { variants: { $size: 0 } },
                ],
              },
              { quantity: { $lt: stock } },
            ],
          },
        ],
      };
    }

    let query = Product.find(filter).select(selectStr).sort(sort);

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((p) => (query = query.populate(p)));
      } else {
        query = query.populate(populate);
      }
    }

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query.lean();

    if (!products.length) {
      throw new NotFoundError("Không tìm thấy sản phẩm");
    }

    return attachPromotions(products);
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
      collections,
      publish,
      slug,
      variants,
    } = product;

    let variantsParse = JSON.parse(variants);

    let mainImages = [];
    let newProduct = new Product();
    // Upload image to cloudinary
    if (files && files["productImages"]) {
      const uploadedImages = await uploadFilesToCloudinary(
        files["productImages"],
        newProduct._id.toString()
      );
      mainImages = uploadedImages;
    }
    if (files && files["variantsImages"]) {
      let uploadedImages = await uploadFilesToCloudinary(
        files["variantsImages"],
        newProduct._id.toString()
      );
      let imageIndex = 0;

      // image url for variants
      variantsParse.forEach((variant) => {
        if (variant.images.length > 0) {
          variant.images = uploadedImages.slice(
            imageIndex,
            imageIndex + variant.images.length
          );
          imageIndex += variant.images.length;
        }
      });
    }
    newProduct = new Product({
      title,
      sku,
      descr,
      brand: brand.toUpperCase() || "Khác",
      price: Number(price) || 0,
      images: mainImages,
      quantity: Number(quantity) || 0,
      collections: JSON.parse(collections),
      slug: slug,
      publish: publish === "true",
      variants: variantsParse,
    });
    await newProduct.save();
    return newProduct;
  };

  static updateProduct = async (id, files, payload) => {
    const product = await Product.findById(id);
    if (!product) {
      throw new NotFoundError("Không tìm thấy sản phẩm");
    }
    const {
      title,
      sku,
      imagesObject,
      variantsImagesList,
      brand,
      quantity,
      descr,
      price,
      collections,
      publish,
      slug,
      variants,
    } = payload;
    let mainImages = [];
    let variantsParse = JSON.parse(variants) ?? [];
    // Handle update main images
    if (imagesObject && JSON.parse(imagesObject).length > 0) {
      const imagesObjectParse = JSON.parse(imagesObject);
      let uploadedImages = [];
      if (files && files["productImages"]) {
        uploadedImages = await uploadFilesToCloudinary(
          files["productImages"],
          id
        );
      }
      mainImages = imagesObjectParse
        .sort((a, b) => a.index - b.index)
        .map((item) => {
          if (item.type === "old") return item.value;
          return uploadedImages[item.index];
        });
    }
    // Handle update variants images
    else if (variantsImagesList && JSON.parse(variantsImagesList).length > 0) {
      const variantsImagesListParse = JSON.parse(variantsImagesList);
      let uploadVariantsImages = [];
      if (files && files["variantsImages"]) {
        uploadVariantsImages = await uploadFilesToCloudinary(
          files["variantsImages"],
          id
        );
      }
      let count = 0;
      const updateVariants = variantsParse.map((variant, index) => {
        const imagesList = variantsImagesListParse[index] ?? [];

        const sortImagesList = [...imagesList].sort(
          (a, b) => a.index - b.index
        );

        const images = sortImagesList.map((item) => {
          if (item.type === "old") {
            return item.value;
          }
          // If image is new it need to upload then use count to update exactly url
          const url = uploadVariantsImages[count];
          count++;
          return url;
        });
        return { ...variant, images };
      });
      variantsParse = updateVariants;
    }
    product.set({
      title,
      sku,
      descr,
      brand: brand.toUpperCase() || "Khác",
      price: Number(price) || 0,
      images: mainImages,
      quantity: Number(quantity) || 0,
      collections: JSON.parse(collections),
      slug: slug,
      publish: publish === "true",
      variants: variantsParse,
    });
    await product.save();
    return product;
  };

  static deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
  };

  static getRecommendProducts = async (
    productId,
    userId,
    cartId,
    viewProductsId,
    vectorCache
  ) => {
    let orderProductsId = [];
    let cartProductsId = [];
    let baseVector;
    if (userId) {
      const orders = await OrderService.getOrdersByUserId(userId);
      orderProductsId = [
        ...new Set(
          orders.flatMap((order) =>
            order.products.map((product) => product.productId.toString())
          )
        ),
      ];
    }
    const cart = await CartService.getUserCart({ cartId, userId });
    if (cart) {
      cartProductsId = [...new Set(cart.items.map((item) => item.productId))];
    }
    if (!vectorCache) {
      baseVector = await PineconeService.getBaseVector(
        viewProductsId,
        orderProductsId,
        cartProductsId
      );
    } else {
      baseVector = vectorCache;
    }
    const productsId = await PineconeService.recommendProductsForUser(
      productId,
      baseVector
    );
    const products = await Product.find({
      _id: { $in: productsId },
    }).lean();
    const productsWithPromotion = await attachPromotions(products);
    return {
      vector: baseVector,
      products: productsWithPromotion,
    };
  };

  static getProductBySlug = async (slug) => {
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      throw new NotFoundError("Không tìm thấy sản phẩm");
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
      throw new NotFoundError("Không tìm thấy sản phẩm");
    }
    const productsWithPromotion = await attachPromotions(products);
    return { products: productsWithPromotion, total };
  };
  static getProductById = async (productId) => {
    const product = await Product.findById(productId)
      .populate("collections")
      .lean();
    if (!product) {
      throw new NotFoundError("Không tìm thấy sản phẩm");
    }
    const productWithPromotion = await attachPromotions(product);
    return productWithPromotion;
  };

  static getProductsByCollection = async (collectionSlug, limit) => {
    const collection = await Collection.findOne({
      slug: collectionSlug,
    }).lean();
    if (!collection) {
      throw new NotFoundError("Không tìm thấy bộ sưu tập");
    }
    const [products, total] = await Promise.all([
      findProductsByCollection(collection, limit),
      Product.countDocuments({
        collections: { $in: collection._id },
      }),
    ]);
    if (!products) {
      throw new NotFoundError("Không tìm thấy sản phẩm");
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

    let { query, type, suppliers } = await findSuppliersAndNameByCollectionSlug(
      {
        collectionSlug: slug,
        collection,
      }
    );

    if (query === null) {
      throw new BadRequestError("Đã xảy ra lỗi");
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
      throw new NotFoundError("Không tìm thấy sản phẩm");
    }
    const productsWithPromotion = await attachPromotions(products);
    return { products: productsWithPromotion, type, suppliers, total };
  };
}

export default ProductService;
