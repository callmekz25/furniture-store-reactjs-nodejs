import crypto from "crypto";
import axios from "axios";
import { MOMO_ACCESS_KEY, MOMO_SECRET_KEY, MOMO_URL } from "../constants.js";

class MomoService {
  static createPayment = async ({
    orderId,
    total,
    name,
    email,
    phoneNumber,
  }) => {
    const partnerCode = "MOMO";
    const accessKey = MOMO_ACCESS_KEY;
    const secretKey = MOMO_SECRET_KEY;
    const requestId = orderId;
    const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    const redirectUrl = "http://localhost:5173/cart";
    const ipnUrl = "http://localhost:8000/payment/webhook?paymentMethod=momo";
    const amount = total;
    const requestType = "payWithMethod";
    const autoCapture = true;
    const lang = "vi";
    const user_info = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
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
    try {
      const res = await axios(options);
      return res.data;
    } catch (err) {
      console.error("MoMo error", err.response?.data || err);
    }
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
      console.error("Sai chữ ký webhook từ MoMo");
      return res.status(400).send("Invalid signature");
    }

    if (resultCode === 0) {
      console.log(`Thanh toán thành công cho đơn hàng ${orderId}`);
    } else {
      console.warn(`Thanh toán thất bại với order ${orderId}: ${message}`);
    }

    return res.status(200).send("OK");
  };
}
export default MomoService;
