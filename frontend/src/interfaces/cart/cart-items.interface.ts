interface ICartItems {
  productId: string;
  slug: string;
  image: string;
  discount: number;
  title: string;
  quantity: number;
  price: number;
  fakePrice: number;
  attributes: {
    [key: string]: string;
  } | null;
}
export default ICartItems;
