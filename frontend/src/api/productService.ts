import IProduct from "@/interfaces/product.interface";
import httpRequest from "./config";

const addProduct = async (
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
    const { data } = await httpRequest.get(`/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getProductsByCollectionWithLimit = async (
  slug: string,
  limit: number = 8
) => {
  try {
    const { data } = await httpRequest.get(
      `/products/collection/${slug}?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getRelatedProducts = async (category: string) => {
  try {
    const { data } = await httpRequest.get(`/products/category/${category}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getProductsByCollectionOrCategory = async (
  pageParam: number,
  slug: string,
  searchParams: URLSearchParams
) => {
  try {
    const queryString = searchParams.toString();
    const url = queryString
      ? `/collections/${slug}?page=${pageParam}&${queryString}`
      : `/collections/${slug}?page=${pageParam}`;

    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Để React Query xử lý lỗi
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await httpRequest.get(`/products/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addRecentlyViewedProduct = (product: IProduct) => {
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
const getRecentlyViewedProducts = () => {
  const key = "recently-viewed-products";

  const viewedProducts = JSON.parse(localStorage.getItem(key));
  return viewedProducts ? viewedProducts : [];
};

export {
  addProduct,
  addRecentlyViewedProduct,
  getRecentlyViewedProducts,
  getProducts,
  getRelatedProducts,
  getProductBySlug,
  getProductsByCollectionWithLimit,
  getProductsByCollectionOrCategory,
};
