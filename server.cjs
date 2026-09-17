var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 9395;
  app.use(import_express.default.json());
  const ai = process.env.GEMINI_API_KEY ? new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
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
        prompt,
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
  app.post("/api/categorize-image", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }
    try {
      const { imageUrl } = req.body;
      if (!imageUrl) {
        return res.status(400).json({ error: "imageUrl is required" });
      }
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
              mimeType
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
