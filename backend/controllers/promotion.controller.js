import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import PromotionService from "../services/promotion.service.js";
class PromotionController {
  static addPromotion = asyncHandler(async (req, res, next) => {
    await PromotionService.addPromotion(req.body);
    return res.status(200).json(
      new OkSuccess({
        message: "Add promotion successfully",
      })
    );
  });
}
export default PromotionController;
