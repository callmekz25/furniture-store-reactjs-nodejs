// chat.service.js
import { GoogleGenAI, Mode, Type } from "@google/genai";
import { GEMINI_API_KEY } from "../constants.js";
import { getProductsDeclaration } from "../functions-calling/product.fn-declaration.js";
import ProductService from "./product.service.js";
import attachPromotions from "../helpers/attachPromotions.js";
import Product from "../models/product.model.js";
import Collection from "../models/collection.model.js";
import PineconeService from "./pinecone.service.js";
import { htmlToPlainText } from "../utils/html-to-text.js";

class ChatService {
  static ai = new GoogleGenAI(GEMINI_API_KEY);
  static model = "gemini-2.5-flash";
  static sendChatRequest = async (message) => {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        reply: { type: Type.STRING },
        pick: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ["reply", "pick"],
    };

    const rule = `Bạn là trợ lý bán hàng cho cửa hàng Baya
Thông tin của cửa hàng:
- Tên: Baya
- Số điện thoại: 0123456789
- Email: nguyenhongkhanhvinh2511@gmail.com
- Giờ hoạt động: 8:00-20:00 daily
- Địa chỉ: 120 ABC, XYZ
Hãy trả lời lịch sự, không quá dài dòng, không MARKDOWN. Nếu không tìm thấy thông tin về sản phẩm mà khách hàng tìm thì hãy gợi ý cho khác hàng mô tả về màu sắc, kích thước, giá. Nếu có danh sách sản phẩm ứng viên thì hãy lọc trả về danh sách _id phù hợp theo yêu cầu. 
Ví dụ về response xem bên mẫu dưới.
Câu hỏi hoặc yêu cầu: Tôi muốn mua bàn học giá dưới 1 triệu.
Nếu câu hỏi không phải về sản phẩm thì phản hồi như bình thường.
BẮT BUỘC TRẢ VỀ DẠNG SAU
{
  "reply": "Phản hồi dạng text",
  "pick": ["id", "id"]
  }
LƯU Ý không được thêm bất kì MARKDOWN hoặc chữ json trước object. Hãy trả về định dạng object

`;
    const config = {
      responseSchema: responseSchema,
      mode: Mode.JSON,
      systemInstruction: rule,
    };

    let products = [];
    // Get list ids by semantic search and get products from db by ids
    const records = await PineconeService.searchRecords(message);
    if (records?.result?.hits) {
      const ids = records.result.hits.map((r) => r._id);
      products = await Product.find(
        { _id: { $in: ids }, publish: true },
        { embedding: 0, createdAt: 0, updatedAt: 0 }
      ).lean();
      products = products.map((p) => {
        const { collections, descr } = p;
        const descrRemoveHtmlTag = htmlToPlainText(descr);
        const collectionsString = collections.map((c) => c.name).join(",");
        return {
          ...p,
          collections: collectionsString,
          descr: descrRemoveHtmlTag,
        };
      });
    }
    const contents = [
      {
        role: "user",
        parts: [{ text: message }],
      },
      {
        role: "user",
        parts: [
          {
            text: `Đây là những sản phẩm phù hợp hãy lọc theo yêu cầu thêm lần nữa để trả về những sản phẩm phù hợp nhất. Danh sách sản phẩm ứng viên: ${JSON.stringify(
              products
            )}`,
          },
        ],
      },
    ];
    const responseFull = await ChatService.ai.models.generateContent({
      model: this.model,
      contents,
      config,
    });

    const response = responseFull?.candidates?.[0]?.content?.parts;

    console.log(response);

    let parseResponse;
    if (response?.[0]?.text) {
      parseResponse = JSON.parse(response?.[0]?.text);
      console.log(parseResponse);
    }
    let productsFromDb = [];
    if (parseResponse.pick) {
      productsFromDb = await Product.find(
        {
          _id: { $in: parseResponse.pick },
        },
        { embedding: 0, createdAt: 0, updatedAt: 0 }
      ).lean();
      if (productsFromDb.length > 0) {
        productsFromDb = await attachPromotions(productsFromDb);
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
          text: parseResponse.reply ?? "",
          products: productsFromDb ?? [],
        },
      },
    ];

    return conversation;
  };
}

export default ChatService;
