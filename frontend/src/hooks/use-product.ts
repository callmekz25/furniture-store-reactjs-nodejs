import ICollectionLimitResponse from "@/interfaces/paginate-response/collection-limit-response";
import CollectionResponse from "@/interfaces/paginate-response/collection-response";
import IProduct from "@/interfaces/product/product.interface";
import {
  getProductById,
  getProductBySlug,
  getProducts,
  getProductsByCollection,
  getProductsBySearch,
  getRelatedProducts,
  updateProduct,
} from "@/services/product.service";
import searchParamsToObject from "@/utils/search-params-to-object";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = (
  select?: string[],
  filter?: Record<string, string | number>,
  limit?: number
) => {
  return useQuery<IProduct[]>({
    queryKey: ["products", select, filter, limit],
    queryFn: () => getProducts(select, filter, limit),
  });
};

export const useGetRelatedProducts = (id: string) => {
  return useQuery<IProduct[]>({
    queryKey: ["related", id],
    queryFn: () => getRelatedProducts(id),
    enabled: !!id,
  });
};
export const useGetProductById = (id: string) => {
  return useQuery<IProduct>({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
export const useGetProductBySlug = (slug: string) => {
  return useQuery<IProduct>({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};
export const useGetProductsBySearch = (query: string) => {
  return useQuery<ICollectionLimitResponse>({
    queryKey: ["search", query],
    queryFn: () => getProductsBySearch({ q: query }),
    enabled: !!query,
  });
};

export const useGetInfiniteProductsBySearch = (query: string) => {
  return useInfiniteQuery<CollectionResponse>({
    queryKey: ["search", query, "all"],
    queryFn: ({ pageParam = 1 }) =>
      getProductsBySearch({
        q: query,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const limit = 20;
      return allPages.length * limit < lastPage.total
        ? allPages.length + 1
        : undefined;
    },
  });
};
export const useGetInfiniteProductsByCollection = (
  collection: string,
  query: URLSearchParams,
  canFetch: boolean
) => {
  const paramsToObject = searchParamsToObject(query);
  return useInfiniteQuery<CollectionResponse>({
    enabled: !!collection && !!canFetch,
    queryKey: ["collections", collection, query.toString()],
    queryFn: ({ pageParam = 1 }) =>
      getProductsByCollection(collection, {
        ...paramsToObject,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const limit = 20;
      return allPages.length * limit < lastPage.total
        ? allPages.length + 1
        : undefined;
    },
  });
};
export const useGetProductsByCollection = (
  collection: string,
  limit?: number
) => {
  const query = limit && limit > 0 ? { limit } : undefined;
  return useQuery<ICollectionLimitResponse>({
    queryKey: ["collections", collection],
    queryFn: () => getProductsByCollection(collection, query, true),
    enabled: !!collection,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, collections }: { id: string; collections: string[] }) =>
      updateProduct(id, collections),
  });
};
