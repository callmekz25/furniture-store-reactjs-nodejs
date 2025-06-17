import IProduct from "@/interfaces/product/product.interface";
import ICart from "@/interfaces/cart.interface";
type variant = {
  status: boolean;
  sku: string;
  name: string;
  images: string[];
  price: number;
  fakePrice: number;
  quantity: number;
  attributes: {
    [key: string]: string;
  } | null;
};
// Hàm dành cho add cart ở product card
const prepareCartItem = (product: IProduct): ICart => {
  let availableVariant: variant | null | undefined = null;
  if (product.variants && product.variants.length > 0) {
    availableVariant = product.variants.find((v) => v.quantity > 0);
  }

  return {
    productId: product._id!,
    title: product.title,
    quantity: 1,
    image: availableVariant ? availableVariant.images[0] : product.images[0],
    price: product.minPrice,
    fakePrice: availableVariant
      ? availableVariant.fakePrice
      : product.fakePrice,
    slug: product.slug,
    discount: product.discount,
    attributes: availableVariant ? availableVariant.attributes : null,
  };
};
export default prepareCartItem;
