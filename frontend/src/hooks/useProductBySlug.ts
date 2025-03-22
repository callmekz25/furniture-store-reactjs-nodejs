import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/api/productService";
const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
  });
};
export default useProductBySlug;
