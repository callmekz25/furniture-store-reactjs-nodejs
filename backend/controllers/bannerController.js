import Banner from "../models/bannerModel.js";
const getBannersByType = async (req, res) => {
  try {
    const { type } = req.params;
    const banners = await Banner.find({ type: type });
    if (!banners) {
      return res.status(404).json({ mess: "Not found images" });
    }
    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};

export { getBannersByType };
