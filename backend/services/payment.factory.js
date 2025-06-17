import CodService from "./cod.service.js";
import MomoService from "./momo.service.js";
class PaymentFactory {
  static getService(method) {
    switch (method) {
      case "cod":
        return CodService;
      case "momo":
        return MomoService;
      // case "banking":
      //   return BankingService;
      default:
        throw new Error("Invalid payment method");
    }
  }
}
export default PaymentFactory;
