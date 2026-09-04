import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.warn("[gemini] GEMINI_API_KEY is not set — /api/review will fail");
}

export const genai = new GoogleGenAI({ apiKey: apiKey ?? "" });
