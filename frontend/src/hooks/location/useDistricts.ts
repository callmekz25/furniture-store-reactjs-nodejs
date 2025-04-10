import { useQuery } from "@tanstack/react-query";

import { getDistrictsByProvinceId } from "@/api/locationService";
const useDistricts = (provinceId: string) => {
  return useQuery({
    queryKey: ["districts", provinceId],
    queryFn: () => getDistrictsByProvinceId(provinceId),
    enabled: !!provinceId,
  });
};
export default useDistricts;
