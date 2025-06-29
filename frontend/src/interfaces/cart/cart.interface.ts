import ICartItems from "./cart-items.interface";

interface ICart {
  userId: string;
  items: ICartItems[];
  totalItems: number;
  totalPrice: number;
}
export default ICart;
