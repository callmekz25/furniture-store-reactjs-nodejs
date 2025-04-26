import { useInfiniteQuery } from "@tanstack/react-query";

const useProductInfiniteBySearch = (query: string, all: boolean = false) => {
  return useInfiniteQuery(
    {
      queryKey: ["search", query, all],
      queryFn: ({pageParam})
    }
  )
};
