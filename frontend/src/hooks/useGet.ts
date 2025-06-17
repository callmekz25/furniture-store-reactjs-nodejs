import { getAll, getOne } from "@/services/genericService";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export const useGetAll = <T>(
  url: string,
  key: string[],
  credential: boolean = false,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number;
  },
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: key,
    queryFn: () => getAll<T>(url, credential, pathParams, queryParams),
    ...options,
  });
};

export const useGetAllInfinite = <T>(
  url: string,
  key: string[],
  credential: boolean = false,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number;
  },
  options?: Omit<
    UseInfiniteQueryOptions<T, unknown, T, T, string[]>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) => {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam }) =>
      getAll<T>(url, credential, pathParams, queryParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage là object chứa response api mỗi lần trả về
      // allPage là array chứa các lastPage của tất cẩ response api trả về

      const limit = import.meta.env.VITE_LIMIT;
      console.log(lastPage);

      return lastPage.products.length === Number(limit)
        ? allPages.length + 1
        : undefined;
    },
    ...options,
  });
};

export const useGetOne = <T>(
  url: string,
  key: string[],
  credential: boolean = false,
  pathParams?: string | number,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: key,
    queryFn: () => getOne<T>(url, credential, pathParams),
    ...options,
  });
};
