import { GoogleGenAI, Mode, Type } from "@google/genai";
import { GEMINI_API_KEY } from "../constants.js";

class ChatService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);
  static sendChatRequest = async (message) => {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        reply: { type: Type.STRING },
        products: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              brand: { type: Type.STRING },
              descr: { type: Type.STRING },
              sku: { type: Type.STRING },
              images: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              slug: { type: Type.STRING },
              price: { type: Type.NUMBER },
              fakePrice: { type: Type.NUMBER },
              variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    images: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    price: { type: Type.NUMBER },
                    sku: { type: Type.STRING },
                    fakePrice: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
        },
      },
      required: ["reply", "products"],
    };
    const config = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      mode: Mode.JSON,
    };
    const model = "gemini-2.5-flash";

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
    const res = await ChatService.ai.models.generateContent({
      model,
      contents,
      config,
    });
    const candidate = res.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response text from model");

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON format");
    }

    const { reply, products } = parsed;
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
          text: reply ?? "",
          products: products ?? [],
        },
      },
    ];
    return conversation;
  };
}
export default ChatService;
