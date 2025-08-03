import { BadRequestError, NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import attributesEqual from "../utils/attributes-equal.js";
import generateOrderCode from "../utils/generate-order-code.js";
class OrderService {
  static getOrders = async () => {
    const orders = await Order.find(
      { orderStatus: { $ne: "draft" } },
      { products: 0 }
    ).lean();
    return orders;
  };

  static getOrderById = async (orderId, type) => {
    const order = await Order.findById(orderId).lean();
    if (!order) {
      throw new NotFoundError("Không tìm thấy đơn hàng");
    }
    if (type === "checkout" && !order.payment.paymentStatus) {
      const createdAt = new Date(order.createdAt);
      const now = new Date();
      const diffMinutes = (now - createdAt) / 1000 / 60;
      if (diffMinutes > 15) {
        throw new NotFoundError("Không tìm thấy đơn hàng");
      }
    }
    if (type === "detail" && order.orderStatus === "draft") {
      throw new NotFoundError("Không tìm thấy đơn hàng");
    }
    return order;
  };

  static getOrdersByUserId = async (userId) => {
    const orders = await Order.find(
      { userId: userId, orderStatus: { $ne: "draft" } },
      { products: 0, totalItems: 0, orderInfo: 0 }
    ).lean();
    return orders;
  };

  static placeTempOrder = async (orderInfo, userInfo) => {
    const { note, products, totalPrice, totalItems } = orderInfo;
    let userId;
    if (userInfo) {
      const { _id } = userInfo;
      if (_id) {
        userId = _id;
      }
    }

    const order = new Order({
      orderCode: generateOrderCode(),
      products: products,
      totalItems,
      totalPrice,
    });
    if (note) {
      order.orderInfo.note = note;
    }
    if (userId) {
      order.userId = userId;
    }
    for (const product of products) {
      const dbProduct = await Product.findById(product.productId);
      let price;
      if (!dbProduct) throw new NotFoundError("Không tìm thấy đơn hàng");
      // Check if have variants and it out of stock
      if (dbProduct.variants.length > 0) {
        const variant = dbProduct.variants.find((v) =>
          attributesEqual(v.attributes, product.attributes)
        );

        if (variant.quantity < product.quantity) {
          throw new BadRequestError(`Sản phẩm đã hết hàng`);
        }
        price = variant.price;
        variant.quantity -= product.quantity;

        await dbProduct.save();
      } else {
        // Not have variants
        if (dbProduct.quantity < product.quantity) {
          throw new BadRequestError(`Sản phẩm đã hết hàng`);
        }
        price = dbProduct.price;
        await Product.findByIdAndUpdate(product.productId, {
          $inc: { quantity: -product.quantity },
        });
      }

      const discount = product.promotion?.discountValue || 0;
      const finalPrice = price * (1 - discount / 100);
      product.finalPrice = finalPrice;
    }
    order.products = products;
    await order.save();
    return order;
  };

  static confirmedOrder = async (data, orderId) => {
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

    const updateOrder = {
      orderInfo: {
        name,
        email,
        phoneNumber,
        address,
        province,
        district,
        ward,
      },
      payment: {
        paymentMethod: paymentMethod,
      },
      orderStatus: "pending",
    };
    const order = await Order.findByIdAndUpdate(orderId, updateOrder);
    if (!order) {
      throw new NotFoundError("Không tìm thấy đơn hàng");
    }
    return order;
  };
}

export default OrderService;
