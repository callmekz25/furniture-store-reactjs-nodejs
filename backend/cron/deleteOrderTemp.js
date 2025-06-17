import cron from "node-cron";
import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import attributesEqual from "../utils/attributesEqual.js";

// Chạy mỗi 10 phút
cron.schedule("* * * * *", async () => {
  console.log("[CRON] Checking for expired pending orders...");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const expiredTime = new Date(Date.now() - 5 * 60 * 1000);

    const expiredOrders = await Order.find({
      order_status: "pending",
      createdAt: { $lte: expiredTime },
    }).session(session);

    if (!expiredOrders.length) {
      console.log("[CRON] No expired orders found.");
      await session.commitTransaction();
      session.endSession();
      return;
    }
    // Return stock of products
    for (const order of expiredOrders) {
      for (const item of order.products) {
        const dbProduct = await Product.findById(item.productId.toString());
        if (!dbProduct) throw new NotFoundError("Not found product");
        if (dbProduct.variants.length > 0) {
          const variant = dbProduct.variants.find((v) =>
            attributesEqual(v.attributes, item.attributes)
          );

          variant.quantity += item.quantity;

          await dbProduct.save({ session });
        } else {
          // Not have variants
          await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { quantity: +item.quantity } },
            { session }
          );
        }
      }

      await Order.deleteOne({ _id: order._id }).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    console.log(`[CRON] Cancelled ${expiredOrders.length} expired orders.`);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("[CRON] Error cancelling expired orders:", error);
  }
});
