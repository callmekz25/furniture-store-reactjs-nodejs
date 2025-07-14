import ICartItems from "@/interfaces/cart/cart-items.interface";
import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const getPrice = (
  product: IProduct | ICartItems,
  variant?: ISelectedVariant
): number => {
  if (variant) return variant.price;

  if ((product as IProduct).variants?.length > 0) {
    return (
      (product as IProduct).variants.find((v) => v.quantity > 0)?.price ??
      (product as IProduct).variants[0]?.price ??
      0
    );
  }

  return product.price;
};

export default getPrice;
