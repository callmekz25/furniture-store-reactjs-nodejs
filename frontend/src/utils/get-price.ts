import IProduct from "@/interfaces/product/product.interface";

const getPrice = (product: IProduct): number => {
  if (product.variants.length > 0) {
    const availableVariant = product.variants.find((v) => v.quantity > 0);
    if (availableVariant) {
      return availableVariant.price;
    } else {
      return product.variants[0].price;
    }
  } else {
    return product.price;
  }
};

export default getPrice;
