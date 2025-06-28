import { getAll, getOne } from "@/services/generic.service";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

interface PaginatedResponse<T> {
  products: T[];
  total: number;
}
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

interface PaginatedResponse<T> {
  products: T[];
  total: number;
}

export const useGetAllInfinite = <
  TItem,
  TResponse extends PaginatedResponse<TItem>
>(
  url: string,
  key: string[],
  credential = false,
  pathParams?: string | number,
  queryParams?: {
    [key: string]: string | number | string[];
  },
  options?: Omit<
    UseInfiniteQueryOptions<
      TResponse,
      unknown,
      InfiniteData<TResponse, unknown>,
      TResponse,
      string[],
      number
    >,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
): UseInfiniteQueryResult<InfiniteData<TResponse, unknown>, unknown> => {
  return useInfiniteQuery<
    TResponse,
    unknown,
    InfiniteData<TResponse, unknown>,
    string[],
    number
  >({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) =>
      getAll<TResponse>(url, credential, pathParams, queryParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const limit = 20;
      return allPages.length * limit < lastPage.total
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
