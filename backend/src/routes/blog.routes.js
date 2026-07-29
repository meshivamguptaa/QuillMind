import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createBlog,
  getBlogs,
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);

router.get("/my", protect, getMyBlogs);

router.get("/edit/:id", protect, getBlogById);

router.get("/:slug", getBlog);

router.post("/", protect, createBlog);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

export default router;