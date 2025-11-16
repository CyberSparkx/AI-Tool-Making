// For creation of this AI agent I am going to use Simple Langchain not LangGraph

import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();
import { weatherTool } from "../tools/webSearchTool.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.1,
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = await createAgent({
  model,
  tools: [weatherTool],
});

export default agent;
