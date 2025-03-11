import cloudinary from "../config/cloudinary.js";
const uploadFilesToCloudinary = async (files, productId) => {
  try {
    let uploadPromises = files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: `products/${productId}`,
        resource_type: "image",
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return uploadedUrls.map((url) => url.secure_url);
  } catch (error) {
    return error;
  }
};
const uploadImageBlogToCloudinary = async (file) => {
  try {
    const url = await cloudinary.uploader.upload(file.path, {
      folder: `blogs`,
      resource_type: "image",
    });

    return url.secure_url;
  } catch (error) {
    return error;
  }
};
export { uploadFilesToCloudinary, uploadImageBlogToCloudinary };
