import express from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  maxOutputTokens: 2048,
});

app.get("/chat", async (req, res) => {
  try {
    const result = await model.invoke([
      new HumanMessage("What is the weather today ?"),
    ]);

    res.json({ message: result.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
