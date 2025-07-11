import Promotion from "../models/promotion.model.js";
class PromotionService {
  static getAllPromotions = async () => {
    const promotions = await Promotion.find();
    return promotions;
  };

  static addPromotion = async (promotion) => {
    const newPromotion = new Promotion(promotion);
    await newPromotion.save();
  };
}
export default PromotionService;
