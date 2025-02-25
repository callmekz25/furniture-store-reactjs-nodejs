import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import connectMongo from "./config/db.js";
import productsRoutes from "./routes/public/products.js";
import authRoutes from "./routes/public/auth.js";

connectMongo();
const app = express();
const port = PORT;
app.use(cookieParser());
app.use(express.json());
// Cấu hình cho phép gửi cookie từ client
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/v1", productsRoutes);
app.use("/v1", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
