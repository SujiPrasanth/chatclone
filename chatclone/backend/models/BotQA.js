import mongoose from "mongoose";

const botQASchema = new mongoose.Schema({
  question: String,
  answer: String
});

export default mongoose.model("BotQA", botQASchema);
