import mongoose from 'mongoose';
import { BadRequestError, NotFoundError } from '../core/error.response.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import attributesEqual from '../utils/attributes-equal.js';
import generateOrderCode from '../utils/generate-order-code.js';
class OrderService {
  static getOrders = async () => {
    const orders = await Order.find(
      { orderStatus: { $ne: 'draft' } },
      { products: 0 }
    ).lean();
    return orders;
  };

  static getOrderById = async (orderId, type) => {
    const order = await Order.findById(orderId).lean();
    if (!order) {
      throw new NotFoundError('Không tìm thấy đơn hàng');
    }
    if (type === 'checkout' && !order.payment.paymentStatus) {
      const createdAt = new Date(order.createdAt);
      const now = new Date();
      const diffMinutes = (now - createdAt) / 1000 / 60;
      if (diffMinutes > 15) {
        throw new NotFoundError('Không tìm thấy đơn hàng');
      }
    }
    if (type === 'detail' && order.orderStatus === 'draft') {
      throw new NotFoundError('Không tìm thấy đơn hàng');
    }
    return order;
  };

  static getOrdersByUserId = async (userId) => {
    const orders = await Order.find(
      { userId: userId, orderStatus: { $ne: 'draft' } },
      { totalItems: 0, orderInfo: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = new Order({
        orderCode: generateOrderCode(),
        products: [],
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
        let dbProduct;
        let price;

        // Use atomic to handle calc stock
        // Have variants
        if (product.attributes && Object.keys(product.attributes).length > 0) {
          dbProduct = await Product.findOneAndUpdate(
            {
              _id: product.productId,
              'variants.attributes': product.attributes,
              'variants.quantity': { $gte: product.quantity },
            },
            {
              $inc: { 'variants.$.quantity': -product.quantity },
            },
            { new: true, session }
          );

          if (!dbProduct) {
            throw new BadRequestError(
              'Sản phẩm đã hết hàng hoặc không tồn tại'
            );
          }

          const variant = dbProduct.variants.find((v) =>
            attributesEqual(v.attributes, product.attributes)
          );
          if (!variant) {
            throw new BadRequestError('Không tìm thấy biến thể sản phẩm');
          }

          price = variant.price;
        }
        // Not have variants
        else {
          dbProduct = await Product.findOneAndUpdate(
            {
              _id: product.productId,
              quantity: { $gte: product.quantity },
            },
            {
              $inc: { quantity: -product.quantity },
            },
            { new: true, session }
          );

          if (!dbProduct) {
            throw new BadRequestError(
              'Sản phẩm đã hết hàng hoặc không tồn tại'
            );
          }
          price = dbProduct.price;
        }

        const discount = product.promotion?.discountValue || 0;
        const finalPrice = price * (1 - discount / 100);
        product.finalPrice = finalPrice;
        order.products.push(product);
      }
      await order.save({ session });
      await session.commitTransaction();
      session.endSession();
      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
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
      orderStatus: 'pending',
    };
    const order = await Order.findByIdAndUpdate(orderId, updateOrder);
    if (!order) {
      throw new NotFoundError('Không tìm thấy đơn hàng');
    }
    return order;
  };
}

export default OrderService;
