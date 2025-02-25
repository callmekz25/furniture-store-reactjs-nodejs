import IProduct from "@/interfaces/product";
import httpRequest from "./config";

const addProduct = async (files: File[], product: IProduct) => {
  const {
    title,
    sku,
    status,
    brand,
    quantity,
    price,
    fakePrice,
    descr,
    collection,
    category,
    publish,
  } = product;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("files", file);
  });
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("status", status);
  formData.append("brand", brand);
  formData.append("quantity", quantity);
  formData.append("price", price);
  formData.append("fakePrice", fakePrice);
  formData.append("descr", descr);
  formData.append("collection", collection);
  formData.append("category", category);
  formData.append("publish", publish);

  try {
    const { data } = await httpRequest.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  try {
    const { data } = await httpRequest.get("/products");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await httpRequest.get(`/product/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { addProduct, getProducts, getProductBySlug };
