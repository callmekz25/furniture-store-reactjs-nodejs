import { getBannersByTypes } from "@/api/bannerService";
import { useQuery } from "@tanstack/react-query";

const useBannersByType = (type: string) => {
  return useQuery({
    queryKey: ["banners", type],
    queryFn: () => getBannersByTypes(type),
    enabled: !!type,
  });
};
export default useBannersByType;
