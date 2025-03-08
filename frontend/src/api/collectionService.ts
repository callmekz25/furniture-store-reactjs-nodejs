import httpRequest from "./config";

const getCollections = async () => {
  try {
    const { data } = await httpRequest.get("/get-collections");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { getCollections };
