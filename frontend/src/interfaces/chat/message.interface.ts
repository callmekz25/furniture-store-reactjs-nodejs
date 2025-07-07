import IProduct from "../product/product.interface";

interface IMessage {
  role: "user" | "model";
  temp?: boolean;
  createdAt: string;
  message: {
    text: string;
    products?: IProduct[];
  };
}

export default IMessage;
