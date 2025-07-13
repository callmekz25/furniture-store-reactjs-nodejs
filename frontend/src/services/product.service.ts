import IProduct from "@/interfaces/product/product.interface";
import httpRequest from "../config/axios.config";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

export const getProducts = async (query?: string[]) => {
  try {
    const { data } = await httpRequest.get(`/products`, {
      params: {
        q: query,
      },
      paramsSerializer: (params) => params.q.map((v) => `q=${v}`).join("&"),
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
export const getProductsBySearch = async (query: {
  [key: string]: string | number | string[];
}) => {
  try {
    const { data } = await httpRequest.get(`/search`, {
      params: query,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
export const getProductById = async (id: string) => {
  try {
    const { data } = await httpRequest.get(`/admin/products/${id}`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
    const { data } = await httpRequest.get(`/products/${id}/related`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await httpRequest.get(`/products/${slug}`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
export const getProductsByCollection = async (
  collection: string,
  query?: {
    [key: string]: string | number | string[];
  },
  preview: boolean = false
) => {
  try {
    let url = `/collections/${collection}`;
    if (preview) {
      url = `/collections/${collection}/products`;
    }
    const { data } = await httpRequest.get(url, {
      params: query,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
export const addProduct = async (
  files: File[],
  product: IProduct,
  variants: ISelectedVariant[] = []
) => {
  const {
    title,
    sku,
    brand,
    quantity,
    descr,
    collections,
    // category,
    publish,
    slug,
  } = product;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("productImages", file);
  });
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("brand", brand);
  formData.append("quantity", String(quantity));
  formData.append("descr", descr);
  formData.append("collections", JSON.stringify(collections));
  formData.append("variants", JSON.stringify(variants));
  // formData.append("category", category);
  formData.append("publish", String(publish));
  formData.append("slug", String(slug));
  if (variants && variants.length > 0) {
    variants.forEach((variant) => {
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
