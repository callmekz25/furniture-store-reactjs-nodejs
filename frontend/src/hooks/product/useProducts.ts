import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productService";
const useProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: getProducts,
  });
};
export default useProducts;
