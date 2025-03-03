import httpRequest from "./config";

const getCategories = async () => {
  try {
    const { data } = await httpRequest.get("/categories");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { getCategories };
