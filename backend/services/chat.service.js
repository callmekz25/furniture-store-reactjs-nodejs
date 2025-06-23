import { GoogleGenAI } from "@google/generative-ai";
class Chat {
  gemini = new GoogleGenAI(process.env.GEMINI_API_KEY);
  static sendChatRequest = async (message) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
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
            text: `Bạn là trợ lý ảo của cửa hàng baya, đây là thông tin cá nhân của cửa hàng: Tên của hàng là Baya, số điện thoại 0899348258, email nguyenhongkhanhvinh2511@gmail.com, giờ mở cửa là từ 8:00 tới 20:00. Và đây là file chứa thông tin của các sản phẩm trong cửa hàng. Khi có câu hỏi thì hãy trả lời 1 cách ngắn gọn, dễ hiểu nhất. Và nếu có câu hỏi liên quan gì đến các sản phẩm có trong cửa hàng thì hãy trả lời dưới dạng danh sách json: [
            {
              "title": "...",
              "sku": "...",
              "price": "...",
              "brand": "...",
              "description": "...",
              "image": "..."
              "slug"; "..."
              ...
            }
            ] tóm lại là trả về y chang các fields có trong trong file csv sản phẩm`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Xin chào! Tôi là trợ lý ảo của cửa hàng nội thất **Baya**.
              Tôi đã ghi nhận và lưu lại thông tin của cửa hàng:
              *   **Tên cửa hàng:** Baya
              *   **Số điện thoại:** 0899348258
              *   **Email:** nguyenhongkhanhvinh2511@gmail.com
              *   **Giờ mở cửa:** 8:00 - 20:00
              
              Tôi cũng đã đọc và xử lý thành công tệp \`furniture-store.products.csv\` chứa toàn bộ thông tin sản phẩm.
              
              Tôi đã sẵn sàng để hỗ trợ bạn. Bạn cần tìm sản phẩm, kiểm tra giá, xem thông tin chi tiết hay có bất kỳ câu hỏi nào khác không ạ? Hãy cho tôi biết nhé`,
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
    const res = await this.gemini.models.generateContent({
      model,
      contents,
      config,
    });
    const result = await res.response;
    return result.text;
  };
}
