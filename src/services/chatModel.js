import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7, // makes it creative
  maxOutputTokens: 2048, // allow more output
});

// const res = await model.invoke([
//   new HumanMessage("Suggest a creative name for a tech startup focused on AI.")
// ]);

console.log("Model output:", res.content);
