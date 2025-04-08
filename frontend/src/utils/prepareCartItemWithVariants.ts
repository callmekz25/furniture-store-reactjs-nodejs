import IProduct from "@/interfaces/product.interface";

const prepareCartItemWithVariants = ({
  product,
  price,
  fakePrice,
  selectedVariant,
  quantity = 1,
  image,
}: {
  product: IProduct;
  price: number;
  fakePrice: number;
  selectedVariants: object;
  quantity: number;
  image: string;
}) => {
  const attributes = selectedVariant
    ? Object.entries(selectedVariant).map(([key, value]) => value)
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
