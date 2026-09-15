import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK
  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

  // API Route: Guidelines with Search Grounding
  app.post("/api/guidelines", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }
    try {
      const { query } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: query || "What are the latest official RAGT Semences email communication guidelines and best practices?",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini guidelines error:", error);
      res.status(500).json({ error: "Failed to fetch guidelines." });
    }
  });

  // API Route: Image Generation
  app.post("/api/generate-image", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }
    try {
      const { prompt } = req.body;
      if (!prompt) {
         return res.status(400).json({ error: "Prompt is required" });
      }
      const response = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "1:1"
        }
      });
      
      const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
      if (base64Image) {
        res.json({ imageUrl: `data:image/jpeg;base64,${base64Image}` });
      } else {
        res.status(500).json({ error: "No image generated." });
      }
    } catch (error) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: "Failed to generate image." });
    }
  });

  // API Route: Image Categorization
  app.post("/api/categorize-image", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }
    try {
      const { imageUrl } = req.body;
      if (!imageUrl) {
         return res.status(400).json({ error: "imageUrl is required" });
      }

      // Extract base64 and mime type from data URL
      const matches = imageUrl.match(/^data:(image\/[A-Za-z+]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid image data URL format." });
      }
      const mimeType = matches[1];
      const base64Data = matches[2];

      const prompt = `Analyze this image (which is a brand logo or banner for RAGT Semences). 
Categorize it strictly into ONE of the following tags: "Corporate", "Seasonal", "Regional", or "Other".
Return ONLY the category word, nothing else.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ]
      });
      
      const category = response.text ? response.text.trim() : "Other";
      res.json({ category });
    } catch (error) {
      console.error("Image categorization error:", error);
      res.status(500).json({ error: "Failed to categorize image." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
