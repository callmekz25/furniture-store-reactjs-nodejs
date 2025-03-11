import IBlog from "@/interfaces/blog.interface";
import httpRequest from "./config";

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
export {
  getBlogs,
  uploadImageToCloudinary,
  postBlog,
  getBlogByCategoryAndSlug,
};
