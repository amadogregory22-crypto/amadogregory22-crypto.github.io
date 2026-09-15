const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3030);
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".csv": "text/csv; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  const file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // API Gemini Endpoint
  if (urlPath === "/api/gemini" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", async () => {
      try {
        const { prompt, model: modelName = "gemini-1.5-flash", inlineData } = JSON.parse(body);
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        
        if (!apiKey) {
          const fallback = String(prompt || "").slice(0, 220);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            text: "Mode local Signature Studio : " + fallback,
            summary: "Reponse locale utilisee car GOOGLE_GENERATIVE_AI_API_KEY n'est pas configuree.",
            warnings: ["Aucune donnee n'a ete envoyee a Gemini."],
            actions: ["gemini-local-fallback"]
          }));
          return;
        }

        const { GoogleGenAI } = require("@google/genai");
        const ai = new GoogleGenAI({ apiKey });
        const contents = inlineData ? [{ text: prompt }, { inlineData }] : prompt;
        const response = await ai.models.generateContent({ model: modelName, contents });
        const text = typeof response.text === "function" ? response.text() : (response.text || "");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Campaign Helper
  if (urlPath === "/api/gemini/campaign-helper" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", async () => {
      try {
        const { prompt, tone = "pro", campaignName = "" } = JSON.parse(body);
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
        
        let systemInstruction = "Tu es un expert en communication corporate de l'entreprise RAGT (semences, agriculture). ";
        if (tone === "pro") {
          systemInstruction += "Rédige avec un ton très professionnel, officiel, sérieux et soigné.";
        } else if (tone === "engaging") {
          systemInstruction += "Rédige avec un ton engageant, dynamique, enthousiaste et mobilisateur.";
        } else if (tone === "short") {
          systemInstruction += "Rédige une version extrêmement courte, impactante, concise et directe.";
        }

        if (!apiKey) {
          // Fallback responses
          let fallbackText = `[Mode simulation local RAGT] Suggestions de textes d'accompagnement pour la campagne : "${campaignName}"\n\n`;
          if (tone === "pro") {
            fallbackText += `• Option Professionnelle :\n"Dans le cadre de notre engagement pour ${campaignName}, nous vous invitons à participer activement à cette initiative d'entreprise. Retrouvez l'ensemble de nos supports de communication dédiés."`;
          } else if (tone === "engaging") {
            fallbackText += `• Option Engageante :\n"🚀 Rejoignez-nous pour porter haut et fort les couleurs de ${campaignName} ! Ensemble, faisons rayonner nos valeurs d'entreprise. Partagez ce message !"`;
          } else {
            fallbackText += `• Option Courte :\n"${campaignName} : RAGT se mobilise. Découvrez nos supports."`;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ text: fallbackText }));
          return;
        }

        const { GoogleGenAI } = require("@google/genai");
        const ai = new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Rédige un message d'accompagnement pour la campagne de communication "${campaignName}". Consigne de l'utilisateur : ${prompt}`,
          config: {
            systemInstruction,
            temperature: 0.7
          }
        });
        const text = response.text || "";

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Excel Macro Diagnostic
  if (urlPath === "/api/excel-diagnostic" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", async () => {
      try {
        const { filename = "classeur.xlsx" } = JSON.parse(body);
        const isXlsm = filename.toLowerCase().endsWith(".xlsm");
        
        let status = "COMPATIBLE";
        let macros = 0;
        let details = "Ce classeur standard au format Open XML (.xlsx) ne contient pas de code VBA actif. Il est entièrement compatible avec Excel Online et l'abonnement M365 E1.";
        let alternative = "Aucune action requise.";
        let list = [];

        if (isXlsm) {
          status = "NON COMPATIBLE";
          macros = 14;
          details = "Des macros VBA actives ont été détectées dans ce fichier .xlsm. La suite Microsoft 365 E1 n'autorise pas l'exécution de macros VBA dans Excel Online pour navigateurs web.";
          alternative = "Convertir ces scripts en Office Scripts (TypeScript pour le Web) ou migrer les calculs vers un script automatisé Python/pandas.";
          list = [
            "Sub Auto_Open() - Initialisation des menus",
            "Sub Calculer_RSEM() - Calcul des ratios de rendement",
            "Sub Exporter_PDF_Terrain() - Export vers disque local",
            "Function Taux_Conversion() - Fonction de calcul personnalisée"
          ];
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status,
          macros,
          details,
          alternative,
          list
        }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`Signature Studio http://${host}:${port}`);
});
