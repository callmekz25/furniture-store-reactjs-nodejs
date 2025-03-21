interface ICart {
  productId: string;
  slug: string;
  image: string;
  discount: number;
  title: string;
  quantity: number;
  price: number;
  fakePrice: number;
  attributes: string[];
}
export default ICart;
