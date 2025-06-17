import { NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
class CodService {
  static createPayment = async (orderId) => {
    const orderDb = await Order.findById(orderId);
    if (!orderDb) {
      throw new NotFoundError("Not found order");
    }
    orderDb.payment.payment_method = "cod";
    orderDb.order_status = "confirmed";
    await orderDb.save();
    return {
      message: "Payment by COD",
      redirectUrl: "http://localhost:5173/account",
      status: 200,
    };
  };
  static handleWebhook = async (order) => {
    return;
  };
}
export default CodService;
