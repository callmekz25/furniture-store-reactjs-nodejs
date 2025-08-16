import IProduct from "@/interfaces/product/product.interface";
import httpRequest from "../config/axios.config";
import ISelectedVariant from "@/interfaces/product/selected-variant.interface";

export const getProducts = async (
  select?: string[],
  filter?: Record<string, string | number>,
  limit?: number
) => {
  const { data } = await httpRequest.get(`/products`, {
    params: {
      s: select,
      f: filter,
      limit: limit,
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();

      if (Array.isArray(params.s)) {
        params.s.forEach((v) => searchParams.append("s", v));
      } else if (params.s) {
        searchParams.append("s", params.s);
      }

      if (params.f) {
        Object.entries(params.f).forEach(([key, value]) => {
          searchParams.append(`f[${key}]`, String(value));
        });
      }

      if (params.limit != null) {
        searchParams.append("limit", String(params.limit));
      }

      return searchParams.toString();
    },
  });
  return data;
};

export const getProductsBySearch = async (query: {
  [key: string]: string | number | string[];
}) => {
  const { data } = await httpRequest.get(`/search`, {
    params: query,
  });
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await httpRequest.get(`/admin/products/${id}`);
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data } = await httpRequest.get(`/products/${slug}`);
  return data;
};
export const getProductsByCollection = async (
  collection: string,
  query?: {
    [key: string]: string | number | string[];
  },
  preview: boolean = false
) => {
  let url = `/collections/${collection}`;
  if (preview) {
    url = `/collections/${collection}/products`;
  }
  const { data } = await httpRequest.get(url, {
    params: query,
  });
  return data;
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

    price,
    publish,
    slug,
  } = product;
  const formData = new FormData();
  files.forEach((file: File) => {
    formData.append("productImages", file);
  });
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("price", String(price));
  formData.append("brand", brand);
  formData.append("quantity", String(quantity));
  formData.append("descr", descr);
  formData.append("collections", JSON.stringify(collections));
  formData.append("variants", JSON.stringify(variants));
  formData.append("publish", String(publish));
  formData.append("slug", String(slug));
  if (variants && variants.length > 0) {
    variants.forEach((variant) => {
      variant.images.forEach((image) => {
        formData.append(`variantsImages`, image);
      });
    });
  }
  const { data } = await httpRequest.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateProduct = async (
  id: string,
  payload: IProduct,
  variants: ISelectedVariant[],
  images: (string | File)[]
) => {
  const {
    title,
    sku,
    brand,
    quantity,
    descr,
    collections,
    price,
    publish,
    slug,
  } = payload;
  const formData = new FormData();
  // Images string use for compare which images url be deleted
  // And with images type file will be upload to cloudinary
  const imagesObject: {
    type: "old" | "new";
    value: string | number;
    index: number;
  }[] = [];
  const variantsImagesList: {
    type: "old" | "new";
    value: string | number;
    index: number;
  }[][] = [];

  if (images?.length > 0) {
    images.forEach((file: string | File, index: number) => {
      if (typeof file !== "string") {
        formData.append("productImages", file);
        imagesObject.push({ type: "new", value: index, index: index });
      } else {
        imagesObject.push({ type: "old", value: file, index: index });
      }
    });
  }
  formData.append("title", title);
  formData.append("sku", sku);
  formData.append("imagesObject", JSON.stringify(imagesObject));
  formData.append("price", String(price));
  formData.append("brand", brand);
  formData.append("quantity", String(quantity));
  formData.append("descr", descr);
  formData.append("collections", JSON.stringify(collections));
  formData.append("variants", JSON.stringify(variants));
  formData.append("publish", String(publish));
  formData.append("slug", String(slug));
  if (variants && variants.length > 0) {
    variants.forEach((variant) => {
      const variantsImagesObject: {
        type: "old" | "new";
        value: string | number;
        index: number;
      }[] = [];
      variant.images.forEach((image: string | File, index: number) => {
        if (typeof image !== "string") {
          formData.append(`variantsImages`, image);
          variantsImagesObject.push({
            type: "new",
            value: index,
            index: index,
          });
        } else {
          variantsImagesObject.push({
            type: "old",
            value: image,
            index: index,
          });
        }
      });
      variantsImagesList.push(variantsImagesObject);
    });
  }
  formData.append("variantsImagesList", JSON.stringify(variantsImagesList));
  console.log(variantsImagesList);

  const { data } = await httpRequest.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const recommendProducts = async (id: string) => {
  let viewProductsId = [];
  const key = "recently-viewed-products";
  const viewedProducts = JSON.parse(localStorage.getItem(key)) ?? [];
  const vector = JSON.parse(localStorage.getItem("vector")) ?? null;
  if (viewedProducts) {
    viewProductsId = viewedProducts.map((p: IProduct) => p._id);
  }
  const { data } = await httpRequest.post(`/recommend`, {
    viewProductsId,
    vector,
    id,
  });
  console.log(data);

  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await httpRequest.delete(`/products/${id}`);
  return data;
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
