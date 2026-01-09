import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      text: String,
      sender: String,
      file: {
        filename: String,
        path: String,
        mimetype: String
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
