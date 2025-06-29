import ICartItems from "../cart/cart-items.interface";

interface IOrderTempRequest {
  products: ICartItems[];
  note: string;
  totalPrice: number;
  totalItems: number;
}
export default IOrderTempRequest;
