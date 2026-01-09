import mongoose from "mongoose";
import BotQA from "./models/BotQA.js";

await mongoose.connect("mongodb://127.0.0.1:27017/chatclone");

await BotQA.insertMany([
  { question: "HI", answer: "Hello! How can I help you today?" },
  { question: "HELLO", answer: "Hi there!" },
  { question: "HEY", answer: "Hey! What's up?" },
  { question: "GOOD MORNING", answer: "Good morning! Hope you have a great day" },
  { question: "GOOD EVENING", answer: "Good evening! How was your day?" },

  { question: "HOW ARE YOU", answer: "I'm doing great! Thanks for asking" },
  { question: "WHAT IS YOUR NAME", answer: "I'm your chat assistant" },
  { question: "WHO CREATED YOU", answer: "I was created to help answer your questions!" },
  { question: "WHAT CAN YOU DO", answer: "I can chat with you and answer basic questions." },

  { question: "WHAT IS THIS APP", answer: "This is a chat application where you can talk with me." },
  { question: "HOW DOES THIS WORK", answer: "Just type a message and I’ll reply instantly!" },
  { question: "IS THIS FREE", answer: "Yes, this chat application is free to use." },
  { question: "CAN I CHAT ANYTIME", answer: "Of course! I'm available 24/7" },

  { question: "HELP", answer: "Sure! Tell me what you need help with." },
  { question: "SUPPORT", answer: "I'm here to support you. What’s the issue?" },
  { question: "I HAVE A PROBLEM", answer: "No worries, explain the problem and I’ll try to help." },

  

  { question: "BYE", answer: "Goodbye! Have a nice day" },
  { question: "SEE YOU", answer: "See you soon!" },
  { question: "GOOD NIGHT", answer: "Good night! Sweet dreams" },

  { question: "DEFAULT", answer: "Sorry, I didn’t understand that. Can you rephrase?" }
]);

console.log("Bot seeded successfully");
process.exit();
