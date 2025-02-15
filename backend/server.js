import connectMongo from "./config/db.js";
import products from "./routes/products.js";
import users from "./routes/users.js";
import express from "express";
import cors from "cors";
connectMongo();
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.use("/v1", products);
app.use("/v1", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
