import httpRequest from "@/config/axios.config";

export const getSummary = async () => {
  const { data } = await httpRequest.get("/summary");
  return data;
};
