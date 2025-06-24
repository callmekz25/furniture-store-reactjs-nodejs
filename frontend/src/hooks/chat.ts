import { sendChatMessage } from "@/services/chatService";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: string) => sendChatMessage(message),
  });
};
