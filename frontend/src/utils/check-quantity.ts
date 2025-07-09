import IProduct from "@/interfaces/product/product.interface";

const checkQuantity = (product: IProduct): boolean => {
  if (product.variants && product.variants.length > 0) {
    const availableVariant = product.variants.find((v) => v.quantity > 0);
    if (availableVariant) {
      return true;
    }
    return false;
  } else {
    if (product.quantity > 0) {
      return true;
    }
    return false;
  }
};
export default checkQuantity;
