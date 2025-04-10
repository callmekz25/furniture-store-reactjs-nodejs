import { useQuery } from "@tanstack/react-query";

import { getWardsByDistrictId } from "@/api/locationService";
const useWards = (districtId: string) => {
  return useQuery({
    queryKey: ["districts", districtId],
    queryFn: () => getWardsByDistrictId(districtId),
    enabled: !!districtId,
  });
};
export default useWards;
