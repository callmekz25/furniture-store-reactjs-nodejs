import httpRequest from "./config";

const getCategories = async () => {
  try {
    const { data } = await httpRequest.get("/get-categories");
    return data;
  } catch (error: any) {
    throw Error(error?.response?.data?.mess);
  }
};
export { getCategories };
