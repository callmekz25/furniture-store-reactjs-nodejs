import crypto from "crypto";
import axios from "axios";
import {
  MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY,
  MOMO_URL,
  PRODUCTION_ENV,
} from "../constants.js";
import { ConflictRequestError, NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";

class MomoService {
  static createPayment = async (orderId) => {
    const order = await Order.findById(orderId).lean();
    if (!order) {
      throw new NotFoundError("Không tìm thấy đơn hàng");
    }
    const partnerCode = "MOMO";
    const accessKey = MOMO_ACCESS_KEY;
    const secretKey = MOMO_SECRET_KEY;
    const requestId = orderId;
    const orderInfo = `Thanh toán đơn hàng ${order.orderCode}`;
    const redirectUrl = PRODUCTION_ENV
      ? "https://furniture-store-reactjs-nodejs.vercel.app/account"
      : "http://localhost:5173/account";
    const ipnUrl =
      "https://furniture-store-reactjs-nodejs.onrender.com/v1/payment/webhook?paymentMethod=momo";

    const amount = order.totalPrice.toString();
    const requestType = "payWithMethod";
    const autoCapture = true;
    const lang = "vi";

    const extraData = "";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      autoCapture: autoCapture,
      signature,
      lang: lang,
    };
    const options = {
      url: `${MOMO_URL}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(requestBody)),
      },
      data: requestBody,
    };
    const res = await axios(options);
    return res.data;
  };
  static handleWebhook = async (data) => {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = data;

    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

    const expectedSignature = crypto
      .createHmac("sha256", MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    if (signature !== expectedSignature) {
      throw new ConflictRequestError("Incorrect sign");
    }

    if (resultCode === 0) {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new NotFoundError("Not found order");
      }

      await Order.findByIdAndUpdate(orderId, {
        payment: {
          paymentStatus: true,
          paymentMethod: "momo",
        },
      });
    } else {
      console.error("Payment failed");
    }
    return {
      resultCode: 0,
      message: "Received successfully",
    };
  };
}
export default MomoService;
