import ICartItems from "@/interfaces/cart/cart-items.interface";
import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const getFinalPrice = (
  product: IProduct | ICartItems,
  variant?: ISelectedVariant
): number => {
  let basePrice: number;

  if (variant) {
    basePrice = variant.price;
  } else if ((product as IProduct).variants?.length > 0) {
    basePrice =
      (product as IProduct).variants.find((v) => v.quantity > 0)?.price ??
      (product as IProduct).variants[0]?.price ??
      0;
  } else {
    basePrice = product.price;
  }

  if (product.promotion) {
    const { discountValue } = product.promotion;
    return basePrice * (1 - discountValue / 100);
  }

  return basePrice;
};
export default getFinalPrice;
