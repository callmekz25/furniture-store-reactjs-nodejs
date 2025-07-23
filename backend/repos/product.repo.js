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
  // Add field availablePrice to easy to sort
  const products = await Product.aggregate([
    { $match: query },
    {
      $addFields: {
        availableVariants: {
          $filter: {
            input: "$variants",
            as: "v",
            cond: { $gt: ["$$v.quantity", 0] },
          },
        },
      },
    },
    {
      $addFields: {
        availablePrice: {
          $cond: [
            { $gt: [{ $size: "$availableVariants" }, 0] },
            { $min: "$availableVariants.price" },
            {
              $cond: [
                { $gt: [{ $size: "$variants" }, 0] },
                { $arrayElemAt: ["$variants.price", 0] },
                "$price",
              ],
            },
          ],
        },
      },
    },
    { $sort: sort },
    { $skip: (page - 1) * LIMIT },
    { $limit: LIMIT },
  ]);
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
