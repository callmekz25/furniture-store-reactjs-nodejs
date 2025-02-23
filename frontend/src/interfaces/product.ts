interface IProduct {
  title: string;
  sku: string;
  price: number;
  fakePrice: number;
  quantity: number;
  images: [string];
  status: boolean;
  brand: string;
  category: string;
  collection: string;
  descr: string;
  publish: boolean;
}
export default IProduct;
