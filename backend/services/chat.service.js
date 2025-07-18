// chat.service.js
import { GoogleGenAI, Mode, Type } from "@google/genai";
import { GEMINI_API_KEY } from "../constants.js";
import { getProductsDeclaration } from "../functions-calling/product.fn-declaration.js";
import ProductService from "./product.service.js";
import attachPromotions from "../helpers/attachPromotions.js";

class ChatService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);

  static sendChatRequest = async (message) => {
    // Define response schema
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        reply: { type: Type.STRING },
        messageType: {
          type: Type.STRING,
          enum: ["product_inquiry", "general_info", "greeting", "support"],
        },
        products: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              brand: { type: Type.STRING },
              descr: { type: Type.STRING },
              sku: { type: Type.STRING },
              collections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              images: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              slug: { type: Type.STRING },
              price: { type: Type.NUMBER },
              quantity: { type: Type.NUMBER },
              variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    status: { type: Type.STRING },
                    images: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    price: { type: Type.NUMBER },
                    sku: { type: Type.STRING },
                    quantity: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
        },
      },
      required: ["reply", "messageType", "products"],
    };

    const config = {
      responseSchema: responseSchema,
      mode: Mode.JSON,
      tools: [
        {
          functionDeclarations: [getProductsDeclaration],
        },
      ],
    };

    const model = "gemini-2.5-flash";
    const rule = `SYSTEM PROMPT FOR GEMINI - BAYA STORE API

CRITICAL: YOU MUST ONLY RETURN A SINGLE JSON OBJECT. NO TEXT BEFORE OR AFTER THE JSON.

You are the backend API for Baya store system. Store information:
- Name: Baya
- Phone: 0899251725  
- Email: nguyenhongkhanhvinh2511@gmail.com
- Hours: 8:00-20:00 daily
- Address: [Thêm địa chỉ của bạn]

RESPONSE RULES:

1. ANALYZE the user's message to determine messageType:
   - "product_inquiry": User asks about specific products, wants to buy, search for items
   - "general_info": User asks about store info, hours, contact, policies
   - "greeting": User says hello, hi, good morning, etc.
   - "support": User needs help, has complaints, asks for assistance

2. Based on messageType, provide appropriate response:

   FOR PRODUCT INQUIRIES (messageType: "product_inquiry"):
   - Call get_products function to fetch all products
   - Filter and match products based on user's query
   - Return relevant products with full details
   - If no products match, return empty products array with helpful message

   FOR GENERAL INFO (messageType: "general_info"):
   - Provide store information (hours, contact, policies)
   - Return empty products array
   - Be helpful and informative

   FOR GREETINGS (messageType: "greeting"):
   - Respond warmly and introduce store
   - Ask how you can help
   - Return empty products array

   FOR SUPPORT (messageType: "support"):
   - Provide helpful support response
   - Offer contact information if needed
   - Return empty products array

3. JSON FORMAT RULES:
   - NO text outside JSON object
   - NO markdown code blocks
   - Start with { and end with }
   - "reply" field is REQUIRED and cannot be empty
   - "messageType" field is REQUIRED
   - "products" field is REQUIRED (empty array if no products)
   - Properly escape all JSON strings

EXAMPLES:

Product inquiry:
{
  "reply": "Reply normaly",
  "messageType": "product_inquiry",
  "products": [
    {
      "title": "Tủ giày gỗ cao cấp",
      "brand": "Baya Home",
      "descr": "Tủ giày thiết kế hiện đại, chất liệu gỗ bền đẹp",
      "sku": "TG001",
      "collections": ["61k41a24od", "6142m43kabo"],
      "images": ["image1.jpg", "image2.jpg"],
      "slug": "tu-giay-go-cao-cap",
      "price": 1500000,
      "quantity": 10,
      "variants": [
        {
          "name": "Màu nâu",
          "status": "available",
          "sku": "TG001-BROWN",
          "images": ["brown1.jpg"],
          "price": 1500000,
          "quantity": 5
        }
      ]
    }
  ]
}

General info:
{
  "reply": "Cửa hàng Baya mở cửa từ 8:00 đến 20:00 hàng ngày. Bạn có thể liên hệ với chúng tôi qua số điện thoại 0899251725 hoặc email nguyenhongkhanhvinh2511@gmail.com",
  "messageType": "general_info",
  "products": []
}

Greeting:
{
  "reply": "Xin chào! Chào mừng bạn đến với Baya Store. Tôi có thể giúp gì cho bạn hôm nay?",
  "messageType": "greeting",
  "products": []
}

No products found:
{
  "reply": "Xin lỗi, hiện tại chúng tôi không có sản phẩm phù hợp với yêu cầu của bạn. Vui lòng liên hệ 0899251725 để được tư vấn thêm.",
  "messageType": "product_inquiry",
  "products": []
}

REMEMBER: Your entire response must be parseable by JSON.parse(). No additional text allowed.`;

    const contents = [
      {
        role: "user",
        parts: [{ text: rule }],
      },
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ChatService.ai.models.generateContent({
      model,
      contents,
      config,
    });

    // Handle function calling if needed
    let result = null;
    if (response.functionCalls && response.functionCalls.length > 0) {
      const toolCall = response.functionCalls[0];
      if (toolCall.name === "get_products") {
        result = await ProductService.getPublishedProducts();

        // Add function response to conversation
        const functionResponsePart = {
          name: toolCall.name,
          response: { result },
        };

        contents.push(response?.candidates[0].content);
        contents.push({
          role: "user",
          parts: [{ functionResponse: functionResponsePart }],
        });

        // Final response
        const finalResponse = await ChatService.ai.models.generateContent({
          model,
          contents,
          config,
        });

        return await ChatService.parseResponse(finalResponse.text, message);
      }
    }

    // Response if not ask products
    return await ChatService.parseResponse(response.text, message);
  };

  static parseResponse = async (responseText, originalMessage) => {
    try {
      const raw = responseText.trim();
      const cleanJson = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      let { reply, messageType, products } = parsed;
      if (products) {
        products = await attachPromotions(products);
      }
      const conversation = [
        {
          role: "user",
          message: {
            text: originalMessage,
          },
          createdAt: new Date().toISOString(),
        },
        {
          role: "model",
          createdAt: new Date().toISOString(),
          message: {
            text: reply ?? "",
            messageType: messageType ?? "general_info",
            products: products ?? [],
          },
        },
      ];

      return conversation;
    } catch (err) {
      console.error("JSON parsing failed. Raw response:", responseText);
      throw err;
    }
  };
}

export default ChatService;
