import { useEffect, useState, useRef } from "react";
import {
  createNewChat,
  sendChatMessage,
  fetchChatHistory,
  fetchChatById,
} from "./api/api";

export default function Chathome() {
  const token = localStorage.getItem("token");

  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    
  }, [messages]);

  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    const history = await fetchChatHistory(token);
    setChats(history);

    if (history.length > 0) {
      const latestChat = history[history.length - 1];
      setChatId(latestChat._id);
      const msgs = await fetchChatById(token, latestChat._id);
      setMessages(msgs);
    } else {
      const chat = await createNewChat(token);
      setChatId(chat._id);
      setMessages([{ text: "Start your conversation", sender: "bot" }]);
      setChats([chat]);
    }
  };

  const newChat = async () => {
    const chat = await createNewChat(token);
    setChatId(chat._id);
    setMessages([{ text: "Start your conversation", sender: "bot" }]);
    setChats((prev) => [...prev, chat]);
  };

  const loadChat = async (id) => {
    const msgs = await fetchChatById(token, id);
    setChatId(id);
    setMessages(msgs);
    setSidebarOpen(false);
  };

  const send = async () => {
    if (!input.trim() && !file) return;
    if (!chatId) return;

    setMessages((prev) => [
      ...prev,
      {
        text: input || "",
        sender: "user",
        fileName: file?.name,
      },
    ]);

    const formData = new FormData();
    formData.append("chatId", chatId);
    if (input.trim()) formData.append("message", input);
    if (file) formData.append("file", file);

    const res = await sendChatMessage(token, formData);

    setMessages((prev) => [
      ...prev,
      { text: res.answer, sender: "bot" },
    ]);

    setInput("");
    setFile(null);
    fileRef.current.value = "";
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <div className={`fixed lg:static inset-y-0 left-0 bg-white border-r z-50 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        duration-200 lg:translate-x-0 w-64`}>
        <div className="p-4 h-full flex flex-col">
          <button
            onClick={newChat}
            className="w-full p-2 mb-4 bg-blue-500 text-white rounded"
          >
            + New Chat
          </button>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => loadChat(chat._id)}
                className="cursor-pointer p-2 mb-2 border rounded hover:bg-gray-100"
              >
                <p className="font-semibold">Chat</p>
                <p className="text-xs text-gray-500">
                  {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:ml-64">

        <div className="p-4 bg-white border-b flex justify-between">
          <button
            className="lg:hidden border px-2 rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h2 className="font-bold">Chat</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`p-3 rounded-lg max-w-[70%]
                ${m.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"}`}>
                {m.text}
                {m.fileName && (
                  <p className="text-xs mt-1 opacity-80">📎 {m.fileName}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-white">
          {file && (
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-gray-200 px-3 py-1 rounded-full flex-1 truncate">
                📎 {file.name}
              </span>
              <button
                onClick={() => {
                  setFile(null);
                  fileRef.current.value = "";
                }}
                className="text-red-500 font-bold"
              >
                ✖
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={() => fileRef.current.click()}
              className="border px-3 rounded"
            >
              ➕
            </button>

            <input
              className="flex-1 border p-2 rounded"
              placeholder="Click 'new Chat' start coversation"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />

            <button
              onClick={send}
              className="bg-black text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
