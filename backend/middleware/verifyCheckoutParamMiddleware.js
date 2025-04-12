import Order from "../models/orderModel.js";

const validateCheckoutParam = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ mess: "Missing orderId parameter" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ mess: "Order not found" });
    }

    req.order = order;

    return next();
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
};
export default validateCheckoutParam;
