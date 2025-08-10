import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY } from "../constants.js";
import ProductService from "./product.service.js";
import { htmlToPlainText } from "../utils/html-to-text.js";
class PineconeService {
  static pc = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });
  static indexName = "chat-bot";

  static upsertData = async () => {
    const index = await this.pc.describeIndex(this.indexName);
    const namespace = this.pc
      .index(index.name, index.host)
      .namespace("baya-shop");
    const products = await ProductService.getPublishedProducts();

    const records = products?.map((p) => {
      const text = `
      Tên sản phẩm: ${p.title}
      Nhà cung cấp: ${p.brand}
      Bộ sưu tập và danh mục: ${p.collections?.map((c) => c.name).join(",")}
      Mô tả: ${htmlToPlainText(p?.descr)}
      Giá của sản phẩm khi không có biến thể: ${p.price}
      Biến thể của sản phẩm: ${
        Array.isArray(p?.variants) && p.variants.length
          ? p.variants.map((v) => {
              const attr = Object.keys(v.attributes)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n");
              return `Thuộc tính: ${attr}
        Giá của biến thể: ${v.price}`;
            })
          : "Không có biến thể"
      }
      `;
      return { _id: p._id.toString(), chunk_text: text };
    });
    console.log(records);

    await namespace.upsertRecords(records);
  };

  static createIndex = async () => {
    const existIndexName = await this.pc
      .describeIndex(this.indexName)
      .then(() => true)
      .catch(() => false);
    if (!existIndexName) {
      await this.pc.createIndexForModel({
        name: this.indexName,
        cloud: "aws",
        region: "us-east-1",
        embed: {
          model: "llama-text-embed-v2",
          fieldMap: { text: "chunk_text" },
        },
        waitUntilReady: true,
      });
    }
  };
  static searchRecords = async (text) => {
    const index = await this.pc.describeIndex(this.indexName);
    const namespace = this.pc
      .index(index.name, index.host)
      .namespace("baya-shop");
    const response = await namespace.searchRecords({
      query: {
        topK: 4,
        inputs: { text: text },
      },
      fields: ["chunk_text,"],
    });
    console.log(response);
    return response;
  };
}
export default PineconeService;
