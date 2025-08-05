import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

class DashboardService {
  static getSummary = async () => {
    const [totalProducts, totalUsers, totalOrders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
    ]);
    return {
      totalProducts,
      totalUsers,
      totalOrders,
    };
  };
}
export default DashboardService;
