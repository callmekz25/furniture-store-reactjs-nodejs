import { GoogleGenerativeAI } from "@google/generative-ai";

class ChatService {
  static gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  static sendChatRequest = async (message) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = ChatService.gemini.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const contents = [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: `${process.env.PRODUCTS_DATA}`,
              mimeType: `text/csv`,
            },
          },
          {
            text: `${process.env.TRAIN}`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: message,
          },
        ],
      },
    ];
    const res = await model.generateContent({
      contents,
      generationConfig: config,
    });
    const result = await res.response;
    const text = await result.text();
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    let products = [];
    let replyText = text;
    if (match) {
      try {
        products = JSON.parse(match[1]);
        replyText = text.replace(match[0], "").trim();
      } catch (err) {
        console.error(err);
      }
    }
    const conversation = [
      {
        role: "user",
        message: {
          text: message,
        },
        createdAt: new Date().toISOString(),
      },
      {
        role: "model",
        createdAt: new Date().toISOString(),
        message: {
          text: replyText,
          products: products,
        },
      },
    ];
    return conversation;
  };
}
export default ChatService;
