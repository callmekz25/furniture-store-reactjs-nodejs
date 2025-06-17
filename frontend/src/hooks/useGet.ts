import { getAll, getOne } from "@/services/genericService";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
