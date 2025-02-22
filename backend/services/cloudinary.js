import cloudinary from "../config/cloudinary.js";
const uploadFilesToCloudinary = async (files, productId) => {
  let uploadPromises = files.map((file) => {
    return cloudinary.uploader.upload(file.path, {
      folder: `products/${productId}`,
      resource_type: "image",
    });
  });

  const uploadedUrls = await Promise.all(uploadPromises);

  return uploadedUrls;
};
export { uploadFilesToCloudinary };
