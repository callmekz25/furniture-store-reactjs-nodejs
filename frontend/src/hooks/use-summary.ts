import { getSummary } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
