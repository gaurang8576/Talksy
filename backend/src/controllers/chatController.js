import { chatOverview, messagesByChatId } from "../data/chatSeed.js";

const findConversation = (chatId) =>
  chatOverview.chats.find((chat) => chat.id === chatId) ??
  chatOverview.calls.find((call) => call.id === chatId) ??
  null;

export const getChatOverview = (req, res) => {
  res.json(chatOverview);
};

export const getChatMessages = (req, res) => {
  const { chatId } = req.params;
  const conversation = findConversation(chatId);

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  return res.json({
    chat: conversation,
    messages: messagesByChatId[chatId] ?? [],
  });
};

export const sendMessage = (req, res) => {
  const { chatId } = req.params;
  const { text, senderName } = req.body;
  const trimmedText = typeof text === "string" ? text.trim() : "";
  const conversation = findConversation(chatId);

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  if (!trimmedText) {
    return res.status(400).json({ message: "Message text is required" });
  }

  const message = {
    id: `m-${Date.now()}`,
    text: trimmedText,
    isOwn: true,
    senderName: senderName?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  const existingMessages = messagesByChatId[chatId] ?? [];
  messagesByChatId[chatId] = [...existingMessages, message];

  if ("msg" in conversation) {
    conversation.msg = trimmedText;
    conversation.time = "now";
    conversation.isTyping = false;
  }

  return res.status(201).json({ message });
};
