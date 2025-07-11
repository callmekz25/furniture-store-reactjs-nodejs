import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const checkInStock = (
  product: IProduct,
  variant?: ISelectedVariant
): boolean => {
  if (variant) return variant.quantity > 0;

  if (product.variants?.length > 0) {
    return product.variants.some((v) => v.quantity > 0);
  }

  return product.quantity > 0;
};
export default checkInStock;
