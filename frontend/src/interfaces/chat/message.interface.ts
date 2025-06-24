interface IMessage {
  role: "user" | "model";
  temp?: boolean;
  message: {
    text: string;
    products?: {
      title: string;
      brand: string;
      descr: string;
      sku: string;
      images: string[];
      slug: string;
      price: number;
      fakePrice: number;
      variants: {
        images: string[];
        price: number;
        sku: string;
        fakePrice: number;
      }[];
    }[];
  };
  createdAt: string;
}
export default IMessage;
