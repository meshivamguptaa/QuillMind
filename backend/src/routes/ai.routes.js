import express from "express";
import protect from "../middleware/auth.middleware.js";
import { generateBlog } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate", protect, generateBlog);

export default router;