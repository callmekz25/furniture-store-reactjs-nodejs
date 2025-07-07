import { GoogleGenAI, Mode, Type } from "@google/genai";
import { GEMINI_API_KEY } from "../constants.js";
import { getProductsDeclaration } from "../functions-calling/product.fn-declaration.js";
import ProductService from "./product.service.js";
class ChatService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);

  static sendChatRequest = async (message) => {
    // Define response
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
              quantity: { type: Type.NUMBER },
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
                    quantity: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
        },
      },
      required: ["reply", "products"],
    };

    // Use function calling to read data
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


STRICT RULES:

1. NEVER write any text outside the JSON object
2. DO NOT USE MARK DOWN CODE BLOCKS (no \`\`\`json or \`\`\`)
3. START your response directly with the opening brace {
4. END your response with the closing brace }
5. "reply" field is REQUIRED and cannot be empty
6. If no products match, use "products": []
7. If no variants exist, use "variants": []
8. IF PRODUCT HAS VARIANTS MUST RETURN FULL VARIANTS ARRAY
9. Only return the FIRST available variant if multiple exist
10. Properly escape all JSON strings (quotes, newlines, etc.)
11. Ensure valid JSON that can be parsed by JSON.parse()
12. SUMMARY IF PRODUCTS MATCH MUST RETURN FULL FIELDS OF PRODUCTS 

EXAMPLES:

When asked about shoes cabinet must return:
{
  "reply": "Your response text",
  "products": [
    {
      "title": "Tủ giày gỗ cao cấp",
      "brand": "Baya Home",
      "descr": "Tủ giày thiết kế hiện đại, chất liệu gỗ bền đẹp",
      "sku": "TG001",
      "quantity": 10,
      "images": ["image1.jpg", "image2.jpg"],
      "slug": "tu-giay-go-cao-cap",
      "price": 1500000,
      "fakePrice": 2000000,
      "variants": [
        {
          status: ...,
          sku: ...,
          name: ...,
          images: [...],
          price: ...,
          fakePrice: ...,
          quantity: ...,
        
        },
        {
          ...variant2
        }
      ]
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
            text: rule,
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
    const response = await ChatService.ai.models.generateContent({
      model,
      contents,
      config,
    });

    // Get function call & call
    const toolCall = response.functionCalls[0];
    let result;
    if (toolCall.name === "get_products") {
      result = await ProductService.getPublishedProducts();
    }

    // Define function response
    const functionResponsePart = {
      name: toolCall.name,
      response: { result },
    };
    console.log(functionResponsePart);

    // Push to generate final
    contents.push(response?.candidates[0].content);
    contents.push({
      role: "user",
      parts: [{ functionResponse: functionResponsePart }],
    });

    const finalResponse = await ChatService.ai.models.generateContent({
      model,
      contents,
      config,
    });

    console.log(finalResponse.text);
    try {
      const raw = finalResponse.text.trim();
      const cleanJson = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
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
    } catch (err) {
      console.error("JSON parsing failed. Raw response:");
      throw err;
    }
  };
}
export default ChatService;
