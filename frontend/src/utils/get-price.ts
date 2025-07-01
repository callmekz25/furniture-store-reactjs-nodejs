import IProduct from "@/interfaces/product/product.interface";

const getPrice = (product: IProduct): number => {
  if (product.variants.length > 0) {
    const availableVariant = product.variants.find((v) => v.quantity > 0);
    return availableVariant!.price ?? product.variants[0].price;
  }
  return product.price;
};

export default getPrice;
