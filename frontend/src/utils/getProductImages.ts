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
      return product.variants[0].images.slice(0, 1)[0] as string;
    }
  } else {
    if (product?.images?.length > 0) {
      return product.images.slice(0, 2) as string[];
    }

    if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];

      if (firstVariant?.images?.length >= 2) {
        return firstVariant.images.slice(0, 2) as string[];
      }

      if (
        product.variants.length > 1 &&
        product.variants[1]?.images?.length > 0
      ) {
        return [
          firstVariant.images[0] as string,
          product.variants[1].images[0] as string,
        ];
      }

      return firstVariant.images.slice(0, 1) as string[];
    }
  }

  return "";
};

export default getProductImages;
