import { GoogleGenAI } from "@google/genai";

export const generateBlog = async (req, res) => {
  try {
    const { topic } = req.body;

    const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required.",
      });
    }

    const prompt = `
Generate a professional blog about "${topic}".

Return ONLY valid JSON in this exact format:

{
  "title": "",
  "excerpt": "",
  "content": "",
  "seoTitle": "",
  "seoDescription": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    // Remove Markdown code fences if Gemini adds them
    text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    const blog = JSON.parse(text);

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate blog.",
    });
  }
};