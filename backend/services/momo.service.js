import crypto from "crypto";
import axios from "axios";
import { MOMO_ACCESS_KEY, MOMO_SECRET_KEY, MOMO_URL } from "../constants.js";
import { ConflictRequestError } from "../core/error.response.js";
import Order from "../models/order.model.js";

class MomoService {
  static createPayment = async ({
    orderId,
    total,
    name,
    email,
    phoneNumber,
    address,
    province,
    district,
    ward,
  }) => {
    const partnerCode = "MOMO";
    const accessKey = MOMO_ACCESS_KEY;
    const secretKey = MOMO_SECRET_KEY;
    const requestId = orderId;
    const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    const redirectUrl = "http://localhost:5173/cart";
    const ipnUrl =
      "https://7b6a-2402-800-631d-8400-d545-d5f9-336c-4101.ngrok-free.app/v1/payment/webhook?paymentMethod=momo";
    const amount = total;
    const requestType = "payWithMethod";
    const autoCapture = true;
    const lang = "vi";
    const user_info = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address,
      province,
      district,
      ward,
    };
    const extraData = Buffer.from(JSON.stringify(user_info)).toString("base64");

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
  static handleWebhook = async (req) => {
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
    } = req;

    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

    const expectedSignature = crypto
      .createHmac("sha256", MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    if (signature !== expectedSignature) {
      throw new ConflictRequestError("Incorrect sign");
    }

    if (resultCode === 0) {
      const userInfo = JSON.parse(
        Buffer.from(extraData, "base64").toString("utf-8")
      );
      const { email, name, address, phoneNumber, province, district, ward } =
        userInfo;
      const order = await Order.findByIdAndUpdate(orderId, {
        order_info: {
          ...order.order_info,
          email,
          name,
          address,
          phoneNumber,
          province,
          district,
          ward,
        },
        payment: {
          ...order.payment,
          payment_status: true,
        },
        order_status: "confirmed",
      });
      await order.save();
    } else {
      console.log("Payment failed");
    }
  };
}
export default MomoService;
