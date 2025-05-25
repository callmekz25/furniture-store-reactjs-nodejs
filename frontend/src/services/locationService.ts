import httpRequest from "./config";

const getProvinces = async () => {
  try {
    const { data } = await httpRequest.get(
      "https://open.oapi.vn/location/provinces?size=63",
      {
        withCredentials: false,
      }
    );
    return data;
  } catch (error) {
    throw Error(error?.response?.data);
  }
};

const getDistrictsByProvinceId = async (provinceId: string) => {
  try {
    const { data } = await httpRequest.get(
      `https://open.oapi.vn/location/districts/${provinceId}?size=30`,
      {
        withCredentials: false,
      }
    );
    return data;
  } catch (error) {
    throw Error(error?.response?.data);
  }
};
const getWardsByDistrictId = async (districtId: string) => {
  try {
    const { data } = await httpRequest.get(
      `https://open.oapi.vn/location/wards/${districtId}?size=30`,
      {
        withCredentials: false,
      }
    );
    return data;
  } catch (error) {
    throw Error(error?.response?.data);
  }
};
export { getProvinces, getDistrictsByProvinceId, getWardsByDistrictId };
