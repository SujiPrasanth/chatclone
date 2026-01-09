import express from "express";
import Chat from "../models/Chat.js";
import BotQA from "../models/BotQA.js";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/new", auth, async (req, res) => {
  const chat = await Chat.create({
    user: req.userId,
    messages: []
  });
  res.json(chat);
});

router.post(
  "/message",
  auth,
  upload.single("file"),
  async (req, res) => {

    const { chatId, message } = req.body;
    const file = req.file;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.messages.push({
      text: message || "",
      sender: "user",
      file: file
        ? {
            filename: file.originalname,
            path: file.path,
            mimetype: file.mimetype
          }
        : null
    });

    let answer = "File received";

    if (message && message.trim()) {
      const normalized = message.trim().toUpperCase();
      const qa = await BotQA.findOne({ question: normalized });
      answer = qa ? qa.answer : "I don't understand";
    }

    chat.messages.push({
      text: answer,
      sender: "bot"
    });

    await chat.save();
    res.json({ answer });
  }
);

router.get("/history", auth, async (req, res) => {
  const chats = await Chat.find({ user: req.userId });
  res.json(chats);
});

router.get("/:id", auth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.json(chat.messages);
});

export default router;
