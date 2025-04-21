import Product from "../models/product.model.js";
import { LIMIT } from "../constants.js";
export const findSuppliersAndNameBySlug = async ({
  typeSlug,
  collection,
  category,
}) => {
  let query = { publish: true };
  let suppliers = [];
  let type = {};
  if (typeSlug === "all") {
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
    } else if (category) {
      query.category = category.slug;
      type = {
        name: category.name,
      };
      suppliers = await Product.distinct("brand", {
        category: category.slug,
      });
    }
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
    .limit(LIMIT);
  return products;
};
export const findProductsByCollection = async (collectionSlug, limit) => {
  const products = await Product.find({
    publish: true,
    collection: { $in: collectionSlug },
  }).limit(limit);
  return products;
};
