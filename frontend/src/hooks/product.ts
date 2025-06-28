import { updateProduct } from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, collections }: { id: string; collections: string[] }) =>
      updateProduct(id, collections),
  });
};
