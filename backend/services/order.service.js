import { BadRequestError, NotFoundError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import attributesEqual from "../utils/attributesEqual.js";
class OrderService {
  static getOrderById = async (orderId) => {
    if (!orderId) {
      throw new BadRequestError("Missing order id");
    }
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    } else if (order.order_status !== "pending") {
      throw new NotFoundError();
    }

    return order;
  };
  static createTempOrder = async (orderInfo, userInfo) => {
    const { note, products, total_price, total_items } = orderInfo;
    const { _id } = userInfo;

    if (!products || !total_price || !total_items) {
      throw new BadRequestError("Missing products");
    }
    const order = new Order({
      order_code: "31258",
      products: products,
      total_price,
      total_items,
    });
    if (note) {
      order_info.note = note;
    }
    if (_id) {
      order.userId = _id;
    }
    for (const product of products) {
      const dbProduct = await Product.findById(product.productId);
      if (!dbProduct) throw new NotFoundError("Not found product");
      // Check if have variants and it out of stock
      if (dbProduct.variants.length > 0) {
        const variant = dbProduct.variants.find((v) =>
          attributesEqual(v.attributes, product.attributes)
        );

        if (variant.quantity < product.quantity) {
          throw new BadRequestError(`Out of stock ${dbProduct.title}`);
        }
        variant.quantity -= product.quantity;

        await dbProduct.save();
      } else {
        // Not have variants
        if (dbProduct.quantity < product.quantity) {
          throw new BadRequestError(`Out of stock ${dbProduct.title}`);
        }
        await Product.findByIdAndUpdate(product.productId, {
          $inc: { quantity: -product.quantity },
        });
      }
    }

    await order.save();
    return order;
  };

  static confirmedOrder = async (data, params) => {
    const {
      name,
      email,
      orderId,
      phoneNumber,
      address,
      province,
      district,
      ward,
    } = data;

    if (!orderId) {
      throw new NotFoundError("Not found order");
    }

    const updateOrder = {
      order_info: {
        name,
        email,
        phoneNumber,
        address,
        province,
        district,
        ward,
      },
    };
    const order = await Order.findByIdAndUpdate(orderId, updateOrder);
    if (!order) {
      throw new NotFoundError("Not found order");
    }
    return order;
  };
}

export default OrderService;
