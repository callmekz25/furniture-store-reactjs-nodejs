import OrderStatus from "@/enums/order-status";
import PaymentMethod from "@/enums/payment-method";
import ICartItems from "../cart/cart-items.interface";

interface IOrder {
  _id: string;
  orderCode: string;
  userId: string;
  orderInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    note: string;
    address: string;
    province: {
      id: string;
      name: string;
    };
    district: {
      id: string;
      name: string;
    };
    ward: {
      id: string;
      name: string;
    };
  };
  payment: {
    paymentStatus: boolean;
    paymentMethod: PaymentMethod | null;
  };
  orderStatus: OrderStatus;

  products: ICartItems[];
  totalPrice: number;
  totalItems: number;
  createdAt: string;
}
export default IOrder;
