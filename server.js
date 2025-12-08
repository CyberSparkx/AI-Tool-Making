import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import agent from "./src/services/aiAgentModel.js";
import simpleChatbotRoute from "./src/routes/simpleChatbot.route.js";
import webScraperBotRoute from "./src/routes/webScraperBot.route.js";


const app = express();
app.use(express.json());


app.use("/api", simpleChatbotRoute);
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

// Web Scraper Bot Route
app.use("/api", webScraperBotRoute);


app.listen(3000, () => console.log("Server running at http://localhost:3000"));
