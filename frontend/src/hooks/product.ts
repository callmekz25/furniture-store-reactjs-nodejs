import { updateProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, collections }: { id: string; collections: string[] }) =>
      updateProduct(id, collections),
  });
};
