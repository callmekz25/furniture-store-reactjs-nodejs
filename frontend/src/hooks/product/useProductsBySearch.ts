import { getProductsBySearchTerm } from "@/api/productService";
import { useQuery } from "@tanstack/react-query";

const useProductsBySearch = (query: string, all: boolean = false) => {
  return useQuery({
    queryKey: ["search", query, all],
    queryFn: () => getProductsBySearchTerm(query, all),
    enabled: !!query,
  });
};
export default useProductsBySearch;
