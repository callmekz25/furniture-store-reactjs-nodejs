import crypto from "crypto";
import axios from "axios";
import {
  MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY,
  MOMO_URL,
  PRODUCTION_ENV,
} from "../constants.js";
import { ConflictRequestError } from "../core/error.response.js";
import Order from "../models/order.model.js";

class MomoService {
  static createPayment = async ({
    orderId,
    name,
    email,
    phoneNumber,
    address,
    province,
    district,
    ward,
  }) => {
    const order = await Order.findById(orderId).lean();
    const partnerCode = "MOMO";
    const accessKey = MOMO_ACCESS_KEY;
    const secretKey = MOMO_SECRET_KEY;
    const requestId = orderId;
    const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    const redirectUrl = PRODUCTION_ENV
      ? "https://furniture-store-reactjs-nodejs.vercel.app/account"
      : "http://localhost:5173/account";
    const ipnUrl =
      "https://furniture-store-reactjs-nodejs.onrender.com/v1/payment/webhook?paymentMethod=momo";

    const amount = order.totalPrice.toString();
    const requestType = "payWithMethod";
    const autoCapture = true;
    const lang = "vi";

    const addressString = `${address}, ${ward.name}, ${district.name}, ${province.name}`;
    const extraData = Buffer.from(
      JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: addressString,
      })
    ).toString("base64");

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
    console.log(req);

    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    console.log(rawSignature);

    const expectedSignature = crypto
      .createHmac("sha256", MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");
    console.log(expectedSignature);

    if (signature !== expectedSignature) {
      throw new ConflictRequestError("Incorrect sign");
    }
    console.log(resultCode);

    if (resultCode === 0) {
      const order = await Order.findByIdAndUpdate(orderId, {
        payment: {
          ...order.payment,
          paymentStatus: true,
        },
        orderStatus: "pending",
      });

      await order.save();
      console.log("Update order");
    } else {
      console.log("Payment failed");
    }
  };
}
export default MomoService;
