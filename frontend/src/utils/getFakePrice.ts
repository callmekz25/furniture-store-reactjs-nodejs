import IProduct from "@/interfaces/product.interface";
import formatPriceToVND from "./formatPriceToVND";

const getFakePrice = (product: IProduct) => {
  if (product.discount && product.discount > 0) {
    if (product.variants && product.variants.length > 0) {
      return formatPriceToVND(product.variants[0].fakePrice);
    } else {
      if (product.fakePrice > 0) {
        return formatPriceToVND(product.fakePrice);
      }
      return "";
    }
  }
  return "";
};
export default getFakePrice;
