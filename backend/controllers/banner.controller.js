import Banner from "../models/banner.model.js";
const getBannersByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const banners = await Banner.find({ type: type });
    if (!banners) {
      return res.status(404).json({ mess: "Not found images" });
    }
    return res.status(200).json(banners);
  } catch (error) {
    return next(error);
  }
};

export { getBannersByType };
