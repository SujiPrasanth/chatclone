# chatclone
A full-stack ChatGPT-style chat application built using the MERN stack. Features secure authentication, persistent chat history, text and file messaging, and a modern responsive UI with conversation management.

# 💬 ChatGPT-Style Chat Application (MERN Stack)

A full-stack chat application inspired by ChatGPT, built using the **MERN stack**.  
This project supports **user authentication**, **persistent chat history**, **text and file messaging**, and a **modern responsive chat UI**.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based protected routes
- Secure session handling

### 💬 Chat System
- Create multiple chat conversations
- Chat history stored per user
- Load previous conversations anytime
- Chat timestamps for better tracking

### 📝 Messaging
- Send **text messages**
- Upload **files**
- Send **text + file together**
- Bot responds correctly to both inputs
- File name remains visible in chat history

### 🎨 UI/UX
- ChatGPT-style layout
- User messages on the right
- Bot messages on the left
- Sidebar chat history with clickable chats
- Responsive design (mobile + desktop)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)

---

## 📂 Project Structure

```bash
chatclone/
│
├── backend/
│   ├── models/
│   │   ├── Chat.js
│   │   ├── User.js
│   │   └── BotQA.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── server.js
│   └── package.json
|   └── seedBotQA.js
│
├── frontend/
│   ├── src/
│   │   ├── api/api.js
│   │   ├── ChatHome.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── App.jsx
│   └── package.json
