import mongoose from "mongoose";
import { MONGODB_PASSWORD, MONGODB_USERNAME } from "../constants.js";
const connectMongo = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@furniture-store.vvbxd.mongodb.net/furniture-store?retryWrites=true&w=majority&appName=furniture-store`
    );

    console.log("Connect successfully!");
  } catch (error) {
    console.log(error.message);

    console.log("Fail to connect!");
  }
};
export default connectMongo;
