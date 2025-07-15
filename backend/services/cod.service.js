import { NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
class CodService {
  static createPayment = async ({ orderId }) => {
    const orderDb = await Order.findById(orderId);
    if (!orderDb) {
      throw new NotFoundError("Not found order");
    }
    orderDb.payment.paymentMethody = "cod";
    orderDb.orderStatus = "pending";
    await orderDb.save();
    return {
      partnerCode: "COD",
      message: "Đặt hàng thành công.",
      resultCode: 0,
      amount: orderDb.totalPrice,
      orderId: orderId,
    };
  };
  static handleWebhook = async (order) => {
    return;
  };
}
export default CodService;
