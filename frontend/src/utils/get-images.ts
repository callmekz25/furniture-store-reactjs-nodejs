import IProduct from "@/interfaces/product/product.interface";

const getProductImages = (
  product: IProduct,
  onlyOneImage: boolean = false
): string | string[] => {
  if (onlyOneImage) {
    if (product?.images?.length > 0) {
      return product.images.slice(0, 1)[0] as string;
    }
    if (product?.variants?.length > 0) {
      return product.variants.find((v) => v.quantity > 0)?.images[0] as string;
    }
  } else {
    if (product?.images?.length > 0) {
      return product.images.slice(0, 2) as string[];
    }

    if (product?.variants?.length > 0) {
      const availableVariant =
        product.variants.find((v) => v.quantity > 0) ?? product.variants[0];

      if (availableVariant!.images.length >= 2) {
        return availableVariant?.images.slice(0, 2) as string[];
      }

      return availableVariant?.images.slice(0, 1) as string[];
    }
  }

  return "";
};

export default getProductImages;
