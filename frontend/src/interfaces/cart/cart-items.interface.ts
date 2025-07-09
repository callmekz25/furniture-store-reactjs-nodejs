interface ICartItems {
  productId: string;
  slug: string;
  image: string;
  title: string;
  quantity: number;
  price: number;
  attributes: {
    [key: string]: string;
  } | null;
}
export default ICartItems;
