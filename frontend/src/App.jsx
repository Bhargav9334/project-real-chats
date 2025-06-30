import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Listen for messages
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat message", { user: "You", text: input });
      setInput(""); // clear input
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Realtime Chat App</h1>

      <div className="bg-white shadow-lg w-full max-w-xl h-[400px] overflow-y-auto p-4 rounded-lg mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.user === "You" ? "text-right" : "text-left"}`}>
            <span className="font-semibold">{msg.user}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-xl gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
