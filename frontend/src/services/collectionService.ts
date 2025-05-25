import httpRequest from "./config";

const getCollections = async () => {
  try {
    const { data } = await httpRequest.get("/get-collections");
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
export { getCollections };
