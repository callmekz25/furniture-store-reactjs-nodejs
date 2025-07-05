import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import connectMongo from "./config/db.js";
import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import chatRoutes from "./routes/chat.routes.js";
// import "./cron/deleteOrderTemp.js";
connectMongo();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://furniture-store-reactjs-nodejs-e51z.vercel.app",
    ],
    credentials: true,
  })
);
const port = PORT;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/v1", productRoutes);
app.use("/v1", authRoutes);
app.use("/v1", reviewRoutes);
app.use("/v1", cartRoutes);
app.use("/v1", categoryRoutes);
app.use("/v1", collectionRoutes);
app.use("/v1", bannerRoutes);
app.use("/v1", orderRoutes);
app.use("/v1", paymentRoutes);
app.use("/v1", chatRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
