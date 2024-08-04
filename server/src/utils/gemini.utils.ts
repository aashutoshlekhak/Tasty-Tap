import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config";

export function initializeGemini() {
  return new ChatGoogleGenerativeAI({
    apiKey: config.gemini.api_key,
    verbose: true,
    model: "gemini-1.5-pro",
    temperature: 0.5,
  });
}

