import asyncHandler from "../helpers/asyncHandler.js";
import Banner from "../models/banner.model.js";
import { OkSuccess } from "../core/success.response.js";
const getBannersByType = asyncHandler(async (req, res, next) => {
  const { type } = req.params;
  const banners = await Banner.find({ type: type });
  if (!banners) {
    return res.status(404).json({ mess: "Not found images" });
  }
  return res.status(200).json(new OkSuccess({ data: banners }));
});

export { getBannersByType };
