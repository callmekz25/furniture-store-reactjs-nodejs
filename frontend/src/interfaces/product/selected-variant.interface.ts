interface ISelectedVariant {
  images: (string | File)[];
  price: number;
  quantity: number;
  sku: string;
  status?: boolean;
  attributes: {
    [key: string]: string;
  };
}
export default ISelectedVariant;
