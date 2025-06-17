import crypto from "crypto";
import axios from "axios";
import { MOMO_ACCESS_KEY, MOMO_SECRET_KEY, MOMO_URL } from "../constants.js";

class MomoService {
  static createPayment = async ({
    orderId,
    total_price,
    name,
    email,
    phoneNumber,
  }) => {
    const partnerCode = "MOMO";
    const accessKey = MOMO_ACCESS_KEY;
    const secretKey = MOMO_SECRET_KEY;
    const requestId = orderId;
    const orderInfo = "Thanh toán đơn hàng ABC";
    const redirectUrl =
      "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    const amount = total_price;
    const requestType = "captureWallet";
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
      signature,
      lang: "vi",
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
      const momoRes = await axios(options);
      return momoRes.data;
    } catch (err) {
      console.error("MoMo error", err.response?.data || err);
    }
  };
  static handleWebhook = async () => {
    return;
  };
}
export default MomoService;
