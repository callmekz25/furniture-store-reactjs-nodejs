import Promotion from "../models/promotion.model.js";
const attachPromotions = async (products) => {
  const productList = Array.isArray(products) ? products : [products];

  const productIds = productList.map((p) => (p._id ?? p.productId).toString());

  const collectionIds = productList
    .flatMap((p) => p.collections || [])
    .map((id) => id.toString());

  const promotions = await Promotion.find({
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
    $or: [
      { "scope.type": "all" },
      { "scope.type": "products", "scope.ids": { $in: productIds } },
      {
        "scope.type": "collections",
        "scope.ids": { $in: collectionIds },
      },
    ],
  }).lean();

  const productPromotionMap = new Map();
  const collectionPromotionMap = new Map();
  const promotionsForAll = [];
  // Check scope type
  // O(N x K)
  for (const promo of promotions) {
    if (promo.scope.type === "all") {
      promotionsForAll.push(promo);
    } else {
      for (const id of promo.scope.ids) {
        if (promo.scope.type === "products") {
          const list = productPromotionMap.get(id) || [];
          productPromotionMap.set(id, [...list, promo]);
        } else if (promo.scope.type === "collections") {
          const list = collectionPromotionMap.get(id) || [];
          collectionPromotionMap.set(id, [...list, promo]);
        }
      }
    }
  }

  const result = productList.map((product) => {
    const productId = (product._id ?? product.productId).toString();

    const collectionIds = (product.collections || []).map((id) =>
      id.toString()
    );
    let productPromotions = productPromotionMap.get(productId) || []; // -> list promotions base on product
    let collectionPromotions = []; // ->  list promotions base on collection
    // O(M)
    for (const id of collectionIds) {
      const promotion = collectionPromotionMap.get(id) || []; // -> sub list promotions base on collection
      collectionPromotions.push(...promotion);
    }
    // Just get promotion have max discount in product
    const maxPromotion = [
      ...productPromotions,
      ...collectionPromotions,
      ...promotionsForAll,
    ].reduce((max, current) => {
      if (!max) return current;
      return (current.discountValue ?? 0) > (max.discountValue ?? 0)
        ? current
        : max;
    }, null);
    return {
      ...product,
      promotion: maxPromotion,
    };
  });

  return Array.isArray(products) ? result : result[0];
};
export default attachPromotions;
