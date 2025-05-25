import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getProductById,
  getProductBySlug,
  getProducts,
  getProductsByCollection,
  getProductsByCollectionOrCategory,
  getProductsBySearchTerm,
  getRelatedProducts,
} from "@/services/productService";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getProducts,
  });
};

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useGetProductsByCollection = (
  collection: string,
  limit?: number
) => {
  return useQuery({
    queryKey: ["products", collection, limit],
    queryFn: () => getProductsByCollection(collection, limit),
  });
};

export const useGetProductsByCollectionOrCategory = (
  c: string,
  searchParams: URLSearchParams
) => {
  return useInfiniteQuery({
    queryKey: ["collections", c, searchParams.toString()],

    queryFn: ({ pageParam }) =>
      getProductsByCollectionOrCategory(pageParam, c, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage là object chứa response api mỗi lần trả về
      // allPage là array chứa các lastPage của tất cẩ response api trả về
      const limit = import.meta.env.VITE_LIMIT;

      return lastPage.products.length === Number(limit)
        ? allPages.length + 1
        : undefined;
    },
  });
};

export const useGetProductsBySearchLimit = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getProductsBySearchTerm(query),
    enabled: !!query,
  });
};

export const useGetProductsBySearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", query, "all"],
    enabled: !!query,
    queryFn: ({ pageParam }) => getProductsBySearchTerm(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage là object chứa response api mỗi lần trả về
      // allPage là array chứa các lastPage của tất cẩ response api trả về

      const limit = import.meta.env.VITE_LIMIT;

      return lastPage.products.length === Number(limit)
        ? allPages.length + 1
        : undefined;
    },
  });
};
export const useGetRelatedProducts = (slug: string, limit?: number) => {
  return useQuery({
    queryKey: ["relatedProducts", slug, limit],
    queryFn: () => getRelatedProducts(slug, limit),
  });
};
