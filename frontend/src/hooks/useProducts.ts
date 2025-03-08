import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productService";
const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 30,
  });
};
export default useProducts;
