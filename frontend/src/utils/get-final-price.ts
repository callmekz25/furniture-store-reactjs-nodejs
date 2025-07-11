import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const getFinalPrice = (
  product: IProduct,
  variant?: ISelectedVariant
): number => {
  let basePrice: number;

  if (variant) {
    basePrice = variant.price;
  } else if (product.variants?.length > 0) {
    basePrice =
      product.variants.find((v) => v.quantity > 0)?.price ??
      product.variants[0]?.price ??
      0;
  } else {
    basePrice = product.price;
  }

  if (product.promotion) {
    const { discountType, discountValue } = product.promotion;
    return discountType === "percent"
      ? basePrice * (1 - discountValue / 100)
      : basePrice - discountValue;
  }

  return basePrice;
};
export default getFinalPrice;
