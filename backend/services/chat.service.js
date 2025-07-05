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
    const prompt = `SYSTEM PROMPT FOR GEMINI - BAYA STORE API

CRITICAL: YOU MUST ONLY RETURN A SINGLE JSON OBJECT. NO TEXT BEFORE OR AFTER THE JSON.

You are the backend API for Baya store system. Store information:
- Name: Baya
- Phone: 0899251725  
- Email: nguyenhongkhanhvinh2511@gmail.com
- Hours: 8:00-20:00 daily

RESPONSE FORMAT (MANDATORY)

You MUST respond with EXACTLY this JSON structure and NOTHING ELSE:

{
  "reply": "Your response text here",
  "products": [
    {
      "title": "string",
      "brand": "string", 
      "descr": "string",
      "sku": "string",
      "images": ["array of strings"],
      "slug": "string",
      "price": number,
      "fakePrice": number,
      "variants": [
        {
          "images": ["array of strings"],
          "price": number,
          "sku": "string", 
          "fakePrice": number
        }
      ]
    }
  ]
}

STRICT RULES:

1. NEVER write any text outside the JSON object
2. DO NOT use markdown code blocks (no \`\`\`json or \`\`\`)
3. START your response directly with the opening brace {
4. END your response with the closing brace }
5. "reply" field is REQUIRED and cannot be empty
6. If no products match, use "products": []
7. If no variants exist, use "variants": []
8. Only return the FIRST available variant if multiple exist
9. Properly escape all JSON strings (quotes, newlines, etc.)
10. Ensure valid JSON that can be parsed by JSON.parse()

EXAMPLES:

When asked about shoes cabinet must return:
{
  "reply": "Chúng tôi có các mẫu tủ giày phù hợp với nhu cầu của bạn:",
  "products": [
    {
      "title": "Tủ giày gỗ cao cấp",
      "brand": "Baya Home",
      "descr": "Tủ giày thiết kế hiện đại, chất liệu gỗ bền đẹp",
      "sku": "TG001",
      "images": ["image1.jpg", "image2.jpg"],
      "slug": "tu-giay-go-cao-cap",
      "price": 1500000,
      "fakePrice": 2000000,
      "variants": []
    }
  ]
}

When no products found return:
{
  "reply": "Xin lỗi, hiện tại chúng tôi không có sản phẩm phù hợp với yêu cầu của bạn. Vui lòng liên hệ 0899251725 để được tư vấn thêm.",
  "products": []
}

REMEMBER: Your entire response must be parseable by JSON.parse(). No additional text allowed.`;

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
            text: prompt,
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
