import { BadRequestError, NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import attributesEqual from "../utils/attributes-equal.js";
import generateOrderCode from "../utils/generate-order-code.js";
class OrderService {
  static getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).lean();
    if (!order) {
      throw new NotFoundError("Not found order");
    } else if (order.orderStatus !== "draft") {
      throw new NotFoundError();
    }

    return order;
  };

  static getOrdersByUserId = async (userId) => {
    const orders = await Order.find(
      { userId: userId },
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
      if (!dbProduct) throw new NotFoundError("Not found product");
      // Check if have variants and it out of stock
      if (dbProduct.variants.length > 0) {
        const variant = dbProduct.variants.find((v) =>
          attributesEqual(v.attributes, product.attributes)
        );

        if (variant.quantity < product.quantity) {
          throw new BadRequestError(`Out of stock ${dbProduct.title}`);
        }
        price = variant.price;
        variant.quantity -= product.quantity;

        await dbProduct.save();
      } else {
        // Not have variants
        if (dbProduct.quantity < product.quantity) {
          throw new BadRequestError(`Out of stock ${dbProduct.title}`);
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

  static confirmedOrder = async (data, params) => {
    const { name, email, phoneNumber, address, province, district, ward } =
      data;
    const { id } = params;

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
    };
    const order = await Order.findByIdAndUpdate(id, updateOrder);
    if (!order) {
      throw new NotFoundError("Not found order");
    }
    return order;
  };
}

export default OrderService;
