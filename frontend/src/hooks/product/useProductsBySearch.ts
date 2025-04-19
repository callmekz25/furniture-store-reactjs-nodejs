import { getProductsBySearchTerm } from "@/api/productService";
import { useQuery } from "@tanstack/react-query";

const useProductsBySearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getProductsBySearchTerm(query),
    enabled: !!query,
  });
};
export default useProductsBySearch;
