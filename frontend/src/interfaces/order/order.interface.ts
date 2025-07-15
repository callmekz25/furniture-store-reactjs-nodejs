import OrderStatus from "@/enums/order-status";
import PaymentMethod from "@/enums/payment-method";
import ICartItems from "../cart/cart-items.interface";

interface IOrder {
  orderId: string;
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
