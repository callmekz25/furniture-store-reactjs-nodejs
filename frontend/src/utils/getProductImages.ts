import IProduct from "@/interfaces/product/product.interface";

const getProductImages = (
  product: IProduct,
  onlyOneImage: boolean = false
): string | string[] => {
  if (onlyOneImage) {
    if (product?.images?.length > 0) {
      return product.images.slice(0, 1)[0];
    }
    if (product?.variants?.length > 0) {
      return product.variants[0].images.slice(0, 1)[0];
    }
  } else {
    if (product?.images?.length > 0) {
      return product.images.slice(0, 2); // Lấy 2 ảnh đầu tiên của sản phẩm chính
    }

    if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];

      if (firstVariant?.images?.length >= 2) {
        return firstVariant.images.slice(0, 2); // Nếu variant đầu tiên có >= 2 ảnh
      }

      if (
        product.variants.length > 1 &&
        product.variants[1]?.images?.length > 0
      ) {
        return [firstVariant.images[0], product.variants[1].images[0]]; // Lấy 1 ảnh từ mỗi variant
      }

      return firstVariant.images.slice(0, 1); // Chỉ có 1 ảnh duy nhất
    }
  }

  return "";
};

export default getProductImages;
