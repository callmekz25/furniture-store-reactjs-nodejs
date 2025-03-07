import IProduct from "@/interfaces/product.interface";
import httpRequest from "../config";

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
    slug,
  } = product;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("files", file);
  });
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("status", String(status));
  formData.append("brand", brand);
  formData.append("quantity", String(quantity));
  formData.append("price", String(price));
  formData.append("fakePrice", String(fakePrice));
  formData.append("descr", descr);
  formData.append("collection", collection);
  formData.append("category", category);
  formData.append("publish", String(publish));
  formData.append("slug", String(slug));

  try {
    const { data } = await httpRequest.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { addProduct };
