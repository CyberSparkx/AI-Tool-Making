import { StateGraph } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ToolMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();
import { weatherTool } from "../tools/webSearchTool.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.1,
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const modelWithTools = model.bindTools([weatherTool]);

// 1️⃣ MODEL NODE
async function modelNode(state) {
  const result = await modelWithTools.invoke(state.messages);

  return {
    messages: [...state.messages, result],
  };
}

// 2️⃣ TOOL NODE
async function toolNode(state) {
  const last = state.messages[state.messages.length - 1];

  const fc =
    last.functionCall ||
    last.tool_call ||
    last.content?.find?.((c) => c.functionCall)?.functionCall;

  if (!fc) return state;

  const toolName = fc.name;
  const args = fc.args;
  const tool = { get_weather: weatherTool }[toolName];

  const toolResult = await tool.invoke(args);

  // REQUIRED BY LANGCHAIN
  const toolMsg = new ToolMessage({
    name: toolName,  
    tool_call_id: last.id, // maintain the chain
    content: toolResult,
  });

  return {
    messages: [...state.messages, toolMsg],
  };
}

// GRAPH
const graph = new StateGraph({
  channels: {
    messages: {
      default: () => [],
    },
  },
})
  .addNode("model", modelNode)
  .addNode("tool", toolNode)
  .addEdge("__start__", "model")
  .addConditionalEdges("model", (state) => {
    const last = state.messages[state.messages.length - 1];

    const fc =
      last.functionCall ||
      last.tool_call ||
      last.content?.find?.((c) => c.functionCall)?.functionCall;

    return fc ? "tool" : "__end__";
  })
  .addEdge("tool", "model");

export const agent = graph.compile();
export default agent;
