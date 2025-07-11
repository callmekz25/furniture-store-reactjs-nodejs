import IProduct from "@/interfaces/product/product.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const getPrice = (product: IProduct, variant?: ISelectedVariant): number => {
  if (variant) return variant.price;

  if (product.variants?.length > 0) {
    return (
      product.variants.find((v) => v.quantity > 0)?.price ??
      product.variants[0]?.price ??
      0
    );
  }

  return product.price;
};

export default getPrice;
