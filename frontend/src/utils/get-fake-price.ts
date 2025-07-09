import IProduct from "@/interfaces/product/product.interface";

const getFakePrice = (product: IProduct): number => {
  if (product.variants && product.variants.length > 0) {
    return (
      product.variants.find((v) => v.quantity > 0)!.fakePrice ??
      product.variants[0].fakePrice ??
      0
    );
  } else {
    if (product.fakePrice > 0) {
      return product.fakePrice;
    }
    return 0;
  }

  return 0;
};
export default getFakePrice;
