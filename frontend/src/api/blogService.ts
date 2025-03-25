import IBlog from "@/interfaces/blog.interface";
import httpRequest, { httpContentful } from "./config";

const getBlogs = async () => {
  try {
    const { data } = await httpRequest.get("/blogs");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getBlogByCategoryAndSlug = async (slug: string, category: string) => {
  try {
    const { data } = await httpRequest.get(`/blogs/${category}/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await httpRequest.post("/upload-image-blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postBlog = async (file: File, blog: IBlog) => {
  try {
    const { title, content, publish, category, tags, slug } = blog;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", String(title));
    formData.append("content", String(content));
    formData.append("publish", String(publish));
    formData.append("category", String(category));
    formData.append("tags", JSON.stringify(tags));
    formData.append("slug", String(slug));
    const { data } = await httpRequest.post("/post-blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getBlogsContentful = async () => {
  try {
    const response = await httpContentful.get(`/entries`, {
      params: { content_type: "blog", include: 2 }, // Thay "blog" bằng Content Type ID của bạn
    });
    const items = response.data.items;
    const assets = response.data.includes?.Asset || []; // Danh sách assets
    console.log(response);

    // Lặp qua từng blog và gán URL ảnh
    const blogs = items.map((item) => {
      const thumbnailId = item.fields.thumbnail?.sys.id;
      const thumbnailAsset = assets.find(
        (asset) => asset.sys.id === thumbnailId
      );

      return {
        ...item.fields,
        assets,
        id: item.sys.id,
        thumbnailUrl: thumbnailAsset?.fields.file.url || null, // Lấy URL ảnh
      };
    });

    console.log("Blogs:", blogs);
    return blogs;
  } catch (error) {
    throw new Error(error);
  }
};
export {
  getBlogsContentful,
  getBlogs,
  uploadImageToCloudinary,
  postBlog,
  getBlogByCategoryAndSlug,
};
