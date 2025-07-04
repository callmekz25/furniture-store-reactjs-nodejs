import { getHeroImages } from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";

export const useGetHeroImages = () => {
  return useQuery<
    {
      _id: string;
      name: string;
      slug: string;
      image: string;
      priority: number;
    }[]
  >({
    queryKey: ["hero-images"],
    queryFn: getHeroImages,
  });
};
