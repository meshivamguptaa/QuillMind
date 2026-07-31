import api from "./api";

export const generateBlog = (topic) => {
  return api.post("/ai/generate", { topic });
};