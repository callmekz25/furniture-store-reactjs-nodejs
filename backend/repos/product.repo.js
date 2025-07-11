import Product from "../models/product.model.js";
import { LIMIT } from "../constants.js";
export const findSuppliersAndNameBySlug = async ({ slug, collection }) => {
  let query = { publish: true };
  let suppliers = [];
  let type = {};
  if (slug === "all") {
    suppliers = await Product.distinct("brand", {
      publish: true,
    });
    type = {
      name: "Tất cả sản phẩm",
    };
  } else {
    if (collection) {
      query.collection = collection.slug;
      suppliers = await Product.distinct("brand", {
        collection: collection.slug,
      });
      type = {
        name: collection.name,
      };
    } else {
      query = null;
    }
  }
  if (suppliers.length > LIMIT) {
    suppliers = suppliers.slice(0, LIMIT);
  }

  return { query, type, suppliers };
};
export const findTotalProductsByQuery = async (query) => {
  const totalProducts = await Product.countDocuments(query);
  return totalProducts;
};
export const findProductsByQuery = async ({ query, page, sort }) => {
  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * LIMIT)
    .limit(LIMIT)
    .lean();
  return products;
};
export const findProductsByCollection = async (collectionSlug, limit = 8) => {
  const products = await Product.find({
    publish: true,
    collection: { $in: collectionSlug },
  })
    .limit(limit)
    .lean();
  return products;
};
