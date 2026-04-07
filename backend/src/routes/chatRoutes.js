import express from "express";
import {
  getChatMessages,
  getChatOverview,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/", getChatOverview);
router.get("/:chatId/messages", getChatMessages);
router.post("/:chatId/messages", sendMessage);

export default router;
