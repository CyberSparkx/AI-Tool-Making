import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7, // makes it creative
  maxOutputTokens: 2048, // allow more output
  apiKey: process.env.GOOGLE_API_KEY,
});


console.log(process.env.GOOGLE_API_KEY);

export default model;
