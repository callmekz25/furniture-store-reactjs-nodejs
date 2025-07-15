import ICartItems from "../cart/cart-items.interface";
interface IPlaceTempOrderRequest {
  products: ICartItems[];
  note: string;
  totalPrice: number;
  totalItems: number;
}
export default IPlaceTempOrderRequest;
