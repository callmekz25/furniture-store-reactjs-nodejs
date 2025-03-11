import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import connectMongo from "./config/db.js";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import cartRoutes from "./routes/cart.js";
import categoryRoutes from "./routes/category.js";
import collectionRoutes from "./routes/collection.js";
import blogRoutes from "./routes/blog.js";
connectMongo();
const app = express();
const port = PORT;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
// Cấu hình cho phép gửi cookie từ client
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.7:5173"],
    credentials: true,
  })
);

app.use("/v1", productRoutes);
app.use("/v1", authRoutes);
app.use("/v1", reviewRoutes);
app.use("/v1", cartRoutes);
app.use("/v1", categoryRoutes);
app.use("/v1", collectionRoutes);
app.use("/v1", blogRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
