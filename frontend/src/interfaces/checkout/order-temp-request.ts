import ICart from "../cart.interface";

interface IOrderTempRequest {
  products: ICart[];
  note: string;
  total_price: number;
  total_items: number;
}
export default IOrderTempRequest;
