import IProduct from "@/interfaces/product/product.interface";
import getProductImages from "./getProductImages";
import getFakePrice from "./getFakePrice";
import ICart from "@/interfaces/cart.interface";

// Hàm dành cho add cart ở product card
const prepareCartItem = (product: IProduct): ICart => {
  const attributes =
    product.variants && product.variants.length > 0
      ? Object.entries(product.variants[0].attributes).map(
          ([key, value]) => value
        )
      : [];
  return {
    productId: product._id!,
    title: product.title,
    quantity: 1,
    image: getProductImages(product, true),
    price: product.minPrice,
    fakePrice: getFakePrice(product),
    slug: product.slug,
    discount: product.discount,
    attributes,
  };
};
export default prepareCartItem;
