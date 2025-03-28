import IProduct from "@/interfaces/product.interface";

const getFakePrice = (product: IProduct) => {
  if (product.discount && product.discount > 0) {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].fakePrice;
    } else {
      if (product.fakePrice > 0) {
        return product.fakePrice;
      }
      return 0;
    }
  }
  return 0;
};
export default getFakePrice;
