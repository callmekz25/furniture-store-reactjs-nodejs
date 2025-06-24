import { OkSuccess } from "../core/success.response.js";
import asyncHandler from "../helpers/asyncHandler.js";
import ChatService from "../services/chat.service.js";

class ChatController {
  static sendMessage = asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const result = await ChatService.sendChatRequest(message);
    return res.status(200).json(new OkSuccess({ data: result }));
  });
}
export default ChatController;
