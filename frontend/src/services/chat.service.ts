import httpRequest from "../config/axios.config";

export const sendChatMessage = async (message: string) => {
  const { data } = await httpRequest.post(
    "/chat",
    {
      message,
    },
    {
      timeout: 50000,
    }
  );
  return data;
};
