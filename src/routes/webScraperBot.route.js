import express from "express";
import { scrapperBot } from "../controllers/scrapper.controller.js";

const router = express.Router();

router.get("/chat/scraperBot", scrapperBot);

export default router;
