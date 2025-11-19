import model from "../services/chatModel.js";
import { HumanMessage } from "@langchain/core/messages";

export const simpleChatbot = async (req, res) => {
  try {
    const result = await model.invoke([
      new HumanMessage(req.body.message),
    ]);

    res.json({ message: result.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
