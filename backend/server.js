import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import connectMongo from "./config/db.js";
import productRoutes from "./routes/public/products.js";
import authRoutes from "./routes/public/auth.js";
import reviewRoutes from "./routes/private/review.js";
import cartRoutes from "./routes/public/cart.js";
connectMongo();
const app = express();
const port = PORT;
app.use(cookieParser());
app.use(express.json());
// Cấu hình cho phép gửi cookie từ client
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/v1", productRoutes);
app.use("/v1", authRoutes);
app.use("/v1", reviewRoutes);
app.use("/v1", cartRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
