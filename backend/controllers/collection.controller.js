import Collection from "../models/collection.model.js";

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      return res.status(404).json({ mess: "Không tìm thấy collections" });
    }
    return res.status(200).json(collections);
  } catch (error) {
    return res.status(404).json({ mess: error.message });
  }
};
export { getCollections };
