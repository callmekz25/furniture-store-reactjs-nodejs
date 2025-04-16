import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/productService";

const useProductById = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};
export default useProductById;
