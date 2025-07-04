import { getCollections } from "@/services/collection.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
};
