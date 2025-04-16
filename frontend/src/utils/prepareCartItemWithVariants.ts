import IProduct from "@/interfaces/product.interface";

const prepareCartItemWithVariants = ({
  product,
  selectedVariant,
  quantity = 1,
}: {
  product: IProduct;
  selectedVariants: object;
  quantity: number;
}) => {
  let image: string = product.images[0];
  let price: number = product.price;
  let fakePrice: number = product.fakePrice;
  if (selectedVariant) {
    image = selectedVariant?.images[0];
    price = selectedVariant?.price;
    fakePrice = selectedVariant?.fakePrice;
  }
  const attributes = selectedVariant
    ? Object.entries(selectedVariant.attributes).map(([key, value]) => value)
    : [];
  return {
    productId: product._id,
    title: product.title,
    quantity,
    image: image,
    price: price || 0,
    fakePrice: fakePrice || 0,
    slug: product.slug,
    discount: product.discount || 0,
    attributes,
  };
};
export default prepareCartItemWithVariants;
