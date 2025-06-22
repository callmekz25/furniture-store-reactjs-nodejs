import IProduct from "@/interfaces/product/product.interface";
import httpRequest from "./config";

export const addProduct = async (
  files: File[],
  product: IProduct,
  variants: [] = []
) => {
  const {
    title,
    sku,
    status,
    brand,
    quantity,
    fakePrice,
    discount,
    descr,
    collection,
    category,
    isNew,
    publish,
    slug,
  } = product;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("productImages", file);
  });
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("status", String(status));
  formData.append("isNew", String(isNew));
  formData.append("brand", brand);
  formData.append("quantity", String(quantity));
  formData.append("fakePrice", String(fakePrice));
  formData.append("discount", String(discount));
  formData.append("descr", descr);
  formData.append("collection", JSON.stringify(collection));
  formData.append("variants", JSON.stringify(variants));
  formData.append("category", category);
  formData.append("publish", String(publish));
  formData.append("slug", String(slug));
  if (variants && variants.length > 0) {
    variants.forEach((variant, index) => {
      variant.images.forEach((image) => {
        formData.append(`variantImages`, image);
      });
    });
  }
  try {
    const { data } = await httpRequest.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateProduct = async (id: string, collections: string[]) => {
  try {
    const { data } = await httpRequest.put(`/products/${id}`, {
      collections,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
export const addRecentlyViewedProduct = (product: IProduct) => {
  const key = "recently-viewed-products";

  let viewedProducts = JSON.parse(localStorage.getItem(key)) ?? [];
  if (viewedProducts.length > 0) {
    viewedProducts = viewedProducts.filter(
      (item: IProduct) => item._id !== product._id
    );
  }
  viewedProducts.unshift(product);
  if (viewedProducts.length > 8) {
    viewedProducts.pop();
  }
  localStorage.setItem(key, JSON.stringify(viewedProducts));
};
export const getRecentlyViewedProducts = () => {
  const key = "recently-viewed-products";

  const viewedProducts = JSON.parse(localStorage.getItem(key));
  return viewedProducts ? viewedProducts : [];
};
