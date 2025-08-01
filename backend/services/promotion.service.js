import Promotion from "../models/promotion.model.js";
import { NotFoundError } from "../core/error.response.js";
class PromotionService {
  static getAllPromotions = async () => {
    const promotions = await Promotion.find().lean();
    return promotions;
  };

  static getPromotionById = async (id) => {
    const promotion = await Promotion.findById(id).lean();
    if (!promotion) {
      throw new NotFoundError("Not found promotion");
    }
    return promotion;
  };
  static addPromotion = async (payload) => {
    const promotion = new Promotion(payload);
    await promotion.save();
  };

  static updatePromotion = async (id, payload) => {
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      throw new NotFoundError("Not found promotion");
    }
    const { _id, ...data } = payload;
    Object.assign(promotion, data);
    await promotion.save();
  };
}
export default PromotionService;
