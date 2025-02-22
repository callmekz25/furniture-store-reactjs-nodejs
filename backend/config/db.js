import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/project-fashion");
    console.log("Connect successfully!");
  } catch (error) {
    console.log("Fail to connect!");
  }
};
export default connectMongo;
