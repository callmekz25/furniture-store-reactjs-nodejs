import Promotion from "../models/promotion.model.js";
const validateCheckoutPriceMiddleware = async (req, res, next) => {
  const { products } = req.body;
  const productsList = Array.isArray(products) ? products : [products];

  const productIds = productList.map((p) => p.productId.toString());
  const collectionIds = productsList
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
  const result = productsList.map((product) => {
    const productId = product.productId;
    const collectionIds = (product.collections || []).map((id) =>
      id.toString()
    );
    let productPromotions = productPromotionMap.get(productId) || []; // -> list promotions base on product
    let collectionPromotions = []; // ->  list promotions base on collection
    // O(M)
    for (const id of collectionIds) {
      const promotion = collectionPromotionMap.get(id) || []; // -> list promotions
      collectionPromotions.push(...promotion);
    }
    // Just get promotion have max discount in product
    const maxPromotion = [
      ...productPromotions,
      ...collectionPromotions,
      ...promotionsForAll,
    ].reduce((max, current) => {
      return current.discountValue ?? 0 > max.discountValue ?? 0
        ? current
        : max;
    }, null);
    return {
      ...product,
      promotion: maxPromotion,
    };
  });
};
export default validateCheckoutPriceMiddleware;
