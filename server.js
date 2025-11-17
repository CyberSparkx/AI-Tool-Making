import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { HumanMessage } from "@langchain/core/messages";
import agent from "./src/services/aiAgentModel.js";
import model from "./src/services/chatModel.js";


const app = express();
app.use(express.json());


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

app.post("/weather", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const result = await agent.invoke({
      messages: [{ role: "user", content: userMessage }],
    });

    const last = result.messages[result.messages.length - 1];

    res.json({ message: last.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));
