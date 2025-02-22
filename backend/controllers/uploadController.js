import { uploadFilesToCloudinary } from "../services/cloudinary.js";
const uploadFiles = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedUrls = await uploadFilesToCloudinary(req.files, productId);

    res.json({ urls: uploadedUrls });
  } catch (error) {
    res.status(500).json({ mess: `Upload fail: ${error}` });
  }
};
export default uploadFiles;
