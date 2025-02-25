import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/api/product";
const useProducts = (slug: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProductBySlug(slug),
    staleTime: 1000 * 60 * 30, // Cache trong 5 phút
  });
};
export default useProducts;
