import IProduct from "@/interfaces/product/product.interface";
import ICartItems from "@/interfaces/cart/cart-items.interface";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

const generateCartItem = (product: IProduct): ICartItems => {
  let availableVariant: ISelectedVariant | null | undefined = null;
  if (product.variants && product.variants.length > 0) {
    availableVariant = product.variants.find((v) => v.quantity > 0);
  }

  return {
    productId: product._id!,
    title: product.title,
    collections: product.collections,
    quantity: 1,
    image: availableVariant
      ? (availableVariant.images[0] as string)
      : (product.images[0] as string),
    price: availableVariant ? availableVariant.price : product.price,
    slug: product.slug,
    attributes: availableVariant ? availableVariant.attributes : null,
  };
};
export default generateCartItem;
