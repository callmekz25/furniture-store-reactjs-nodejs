import Blog from "../models/blogModel.js";
import { uploadImageBlogToCloudinary } from "../services/cloudinary.js";

const uploadImageBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ mess: "Invalid file" });
    }
    await uploadImageBlogToCloudinary(req.file);
    return res.status(200).json({ mess: "Upload success" });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
const postBlog = async (req, res) => {
  try {
    const { title, publish, content, category, slug, tags } = req.body;
    if (!title || !publish || !content || !category) {
      return res.status(404).json({ mess: "Invalid data" });
    }
    const blog = new Blog({
      title,
      thumbnail: "",
      publish: publish === "true",
      content,
      category,
      slug,
      tags,
    });
    await blog.save();
    const blogId = blog._id.toString();
    // if (req.files) {
    //   const uploadedImages = await uploadImageBlogToCloudinary(req.files);
    //   blog.thumbnail = uploadedImages;
    //   await blog.save();
    // }
    return res.status(200).json({ mess: "Upload blog success!" });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};

const getBlogByCategoryAndSlug = async (req, res) => {
  try {
    const { category, slug } = req.params;
    if (!category || !slug) {
      return res.status(404).json({ mess: "Invalid params" });
    }
    const blog = await Blog.findOne({
      category: category,
      slug: slug,
      publish: true,
    });
    if (!blog) {
      return res.status(404).json({ mess: "Not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ publish: true });
    if (!blogs) {
      return res.status(404).json({ mess: "Not found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
};
export { postBlog, uploadImageBlog, getBlogByCategoryAndSlug, getBlogs };
