import IProduct from "../product/product.interface";

interface IMessage {
  role: "user" | "model";
  temp?: boolean;
  createdAt: string;
  message: {
    text: string;
    messageType?: "product_inquiry" | "general_info" | "greeting" | "support";
    products?: IProduct[];
  };
}

export default IMessage;
