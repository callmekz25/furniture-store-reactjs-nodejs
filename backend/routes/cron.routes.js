import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { NotFoundError } from "../core/error.response.js";
import attributesEqual from "../utils/attributes-equal.js";

const router = express.Router();

router.get("/cron/delete-expired-order", async (req, res) => {
  console.log("[CRON] Checking for expired pending orders...");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const expiredTime = new Date(Date.now() - 15 * 60 * 1000);

    const expiredOrders = await Order.find({
      orderStatus: "draft",
      createdAt: { $lte: expiredTime },
    }).session(session);

    if (!expiredOrders.length) {
      console.log("[CRON] No expired orders found.");
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ message: "No expired orders found." });
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
    return res.status(200).json({
      message: `Cancelled ${expiredOrders.length} expired orders.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("[CRON] Error cancelling expired orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
