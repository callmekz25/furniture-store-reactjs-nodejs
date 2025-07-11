import Promotion from "../models/promotion.model.js";
const attachPromotions = async (products) => {
  const productList = Array.isArray(products) ? products : [products];
  const ids = productList.map((p) => p._id);

  const promotions = await Promotion.find({
    "scope.productIds": { $in: ids },
    isActive: true,
    // startDate: { $lte: new Date() },
    // endDate: { $gte: new Date() },
  }).lean();

  const promoMap = new Map();

  for (const promo of promotions) {
    for (const pid of promo.scope.productIds) {
      const key = pid.toString();
      if (!promoMap.has(key)) {
        promoMap.set(key, promo);
      }
    }
  }

  // Gán promotion vào từng product
  const result = productList.map((product) => {
    const key = product._id.toString();
    const promotion = promoMap.get(key) ?? null;

    return {
      ...product,
      promotion,
      finalPrice: promotion
        ? promotion.discountType === "percent"
          ? product.price * (1 - (promotion.discountValue || 0) / 100)
          : product.price - promotion.discountValue
        : product.price,
    };
  });

  return Array.isArray(products) ? result : result[0];
};
export default attachPromotions;
