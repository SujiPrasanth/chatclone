# chatclone
A full-stack ChatGPT-style chat application built using the MERN stack. Features secure authentication, persistent chat history, text and file messaging, and a modern responsive UI with conversation management.

# ChatClone – MERN Chat Application 💬

ChatClone is a ChatGPT-style full-stack chat application built using the MERN stack.  
It supports user authentication, chat history, file uploads, and rule-based chatbot responses stored in MongoDB.

This project is designed for learning and demonstrating real-world full-stack concepts such as authentication, protected routes, file handling, and database-driven conversations.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT Authentication)
- 💬 ChatGPT-style UI (User messages on right, bot replies on left)
- 🆕 Create New Chat Sessions
- 🕒 Persistent Chat History
- 📎 File Upload Support
- 🧠 Rule-based Chatbot using MongoDB (BotQA)
- 📂 File name persistence in chat history
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Uploads)


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SujiPrasanth/chatclone.git
cd chatclone

cd backend
npm install
npm install bcrypt

Run MongoDB locally:
node seedBotQA.js

Start backend server:
node server.js

Backend runs on:
http://localhost:3000

cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


