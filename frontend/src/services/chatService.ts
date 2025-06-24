import httpRequest from "./config";

export const sendChatMessage = async (message: string) => {
  try {
    const { data } = await httpRequest.post("/chat", {
      message,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
