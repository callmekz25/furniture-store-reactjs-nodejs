import { httpContentful } from "../config/axios.config";

const getBlogByCategoryAndSlug = async (slug: string, category: string) => {
  try {
    const response = await httpContentful.get(`/entries`, {
      params: {
        content_type: "blog",
        include: 1,
        "fields.categorySlug": category,
        "fields.slug": slug,
      },
    });
    const items = response.data.items;
    const assets = response.data.includes?.Asset || [];
    // Lấy ra phần tử đầu luôn để biến thành object thay vì response mặc đinh là 1 mảng
    const item = items[0];

    const thumbnailId = item.fields.thumbnail?.sys.id;
    const thumbnailAsset = assets.find(
      (asset: []) => asset.sys.id === thumbnailId
    );

    return {
      ...item.fields,
      assets,
      id: item.sys.id,
      thumbnailUrl: thumbnailAsset?.fields.file.url || null,
    };
  } catch (error) {
    throw Error(error?.response?.data?.mess);
  }
};

const getBlogs = async () => {
  try {
    const response = await httpContentful.get(`/entries`, {
      params: {
        content_type: "blog",
        include: 1,
        limit: 6,
        select:
          "sys,fields.title,fields.slug,fields.thumbnail,fields.categorySlug,fields.description,fields.createdAt",
      },
    });
    const items = response.data.items;
    const assets = response.data.includes?.Asset || []; // Danh sách assets

    // Lặp qua từng blog và gán URL ảnh
    const blogs = items.map((item: any) => {
      const thumbnailId = item.fields.thumbnail?.sys.id;
      if (!thumbnailId) {
        console.warn("Không tìm thấy thumbnailId cho item:", item);
      }
      const thumbnailAsset = assets.find(
        (asset: any) => asset.sys.id === thumbnailId
      );

      return {
        ...item.fields,
        assets,
        id: item.sys.id,
        thumbnailUrl: thumbnailAsset?.fields.file.url || null,
      };
    });

    return blogs;
  } catch (error) {
    throw Error(error?.response?.data?.mess);
  }
};
export { getBlogs, getBlogByCategoryAndSlug };
