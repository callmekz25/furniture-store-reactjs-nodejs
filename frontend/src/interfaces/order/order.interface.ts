import OrderStatus from "@/enums/order-status";
import ICartItems from "../cart/cart-items.interface";
import PaymentMethod from "@/enums/payment-method";

interface IOrder {
  orderCode: string;
  userId: string;
  orderInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    note: string;
    address: string;
    province: string;
    district: string;
    ward: string;
  };
  payment: {
    paymentStatus: boolean;
    paymentMethod: PaymentMethod | null;
  };
  orderStatus: OrderStatus;

  products: ICartItems[];
  totalPrice: number;
  totalItems: number;
}
export default IOrder;
