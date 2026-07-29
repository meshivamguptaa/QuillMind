import Blog from "../models/Blog.js";

export const getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({
      createdAt: -1,
    });

    const published = blogs.filter(
      (blog) => blog.status === "published"
    ).length;

    const drafts = blogs.filter(
      (blog) => blog.status === "draft"
    ).length;

    res.json({
      success: true,
      stats: {
        total: blogs.length,
        published,
        drafts,
      },
      recentBlogs: blogs.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};