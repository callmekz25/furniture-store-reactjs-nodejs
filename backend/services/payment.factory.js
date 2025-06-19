import { BadRequestError } from "../core/error.response.js";
import CodService from "./cod.service.js";
import MomoService from "./momo.service.js";
class PaymentFactory {
  static getService(method) {
    switch (method) {
      case "cod":
        return CodService;
      case "momo":
        return MomoService;
      default:
        throw new BadRequestError("Invalid payment method");
    }
  }
}
export default PaymentFactory;
