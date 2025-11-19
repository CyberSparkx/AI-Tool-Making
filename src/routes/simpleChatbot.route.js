import express from "express";
import { simpleChatbot } from "../controllers/simpleChatbot.controller.js";

const router = express.Router();

router.get("/chat", simpleChatbot);

export default router;
