import Product from "../models/product.model.js";
import { LIMIT } from "../constants.js";
export const findSuppliersAndNameByCollectionSlug = async ({
  collectionSlug,
  collection,
}) => {
  let query = { publish: true };
  let suppliers = [];
  let type = {};
  if (collectionSlug === "all") {
    suppliers = await Product.distinct("brand", {
      publish: true,
    });
    type = {
      name: "Tất cả sản phẩm",
    };
  } else {
    if (collection) {
      query.collections = collection._id;
      suppliers = await Product.distinct("brand", {
        collections: { $in: collection._id },
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
export const findProductsByCollection = async (collection, limit = 8) => {
  const products = await Product.find({
    publish: true,
    collections: { $in: collection._id },
  })
    .limit(limit)
    .lean();
  return products;
};
