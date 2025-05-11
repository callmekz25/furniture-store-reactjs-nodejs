import { BadRequestError, NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
class OrderService {
  static getOrderById = async (orderId) => {
    if (!orderId) {
      throw new BadRequestError("Missing order id");
    }
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError("Not found order");
    }
    return order;
  };
  static createTempOrder = async (orderInfo, userInfo) => {
    const { note, products, total_price, total_items } = orderInfo;
    const { userId } = userInfo;
    if (!products || !total_price || !total_items) {
      throw new BadRequestError("Missing products");
    }
    let initOrder;
    if (!userId) {
      initOrder = new Order({
        order_code: "31258",
        order_info: {
          name: "",
          email: "",
          phoneNumber: "",
          note: note || "",
          address: "",
          province: "",
          district: "",
          ward: "",
        },
        products: products,
        order_status: "pending",
        payment: {
          payment_status: false,
        },
        total_price,
        total_items,
      });
    } else {
      initOrder = new Order({
        order_code: "31258",
        userId: req.user.userId,
        order_info: {
          name: "",
          email: "",
          phoneNumber: "",
          note: note || "",
          address: "",
          province: "",
          district: "",
          ward: "",
        },
        products: products,
        order_status: "pending",
        payment: {
          payment_status: false,
        },
        total_price,
        total_items,
      });
    }
    await initOrder.save();
    return initOrder;
  };

  static confirmOrder = async (data, params) => {
    const {
      name,
      email,
      phoneNumber,
      address,
      province,
      district,
      ward,
      paymentMethod,
    } = data;
    const { orderId } = params;
    if (!orderId) {
      throw new BadRequestError("Missing order id");
    }

    if (!order) {
      throw new NotFoundError("Not found order");
    }
    let updateOrder = {
      order_info: {
        name,
        email,
        phoneNumber,
        address,
        province,
        district,
        ward,
      },
      payment: {
        payment_status: paymentMethod === "cod" ? false : true,
        payment_method: paymentMethod,
      },
    };
    const order = await Order.findByIdAndUpdate(orderId, updateOrder);
    return order;
  };
}

export default OrderService;
