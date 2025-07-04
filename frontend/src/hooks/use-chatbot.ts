import { sendChatMessage } from "@/services/chat.service";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: string) => sendChatMessage(message),
  });
};
