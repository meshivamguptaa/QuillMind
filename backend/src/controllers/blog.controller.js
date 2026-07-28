import Blog from "../models/Blog.js";
import slugify from "slugify";
import readingTime from "reading-time";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        message: "Title, content and excerpt are required.",
      });
    }

    let slug = slugify(title, {
        lower: true,
        strict: true,
    });

    const existingBlog = await Blog.findOne({ slug });

        if (existingBlog) {
            slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      author: req.user._id,
      tags,
      status,
      readingTime: readingTime(content).text,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    }).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (title && title !== blog.title) {
      blog.title = title;
      blog.slug = slugify(title, {
        lower: true,
        strict: true,
      });
    }

    if (content) {
      blog.content = content;
      blog.readingTime = readingTime(content).text;
    }

    if (excerpt) blog.excerpt = excerpt;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (tags) blog.tags = tags;
    if (status) blog.status = status;
    if (seoTitle) blog.seoTitle = seoTitle;
    if (seoDescription) blog.seoDescription = seoDescription;

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

