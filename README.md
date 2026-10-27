# 💬 Real-Time Chat App

> A real-time chat application built with React, Node.js and Socket.io — messages appear instantly for every connected user.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)

## 📖 Overview

A lightweight real-time messaging app that uses WebSockets (Socket.io) to broadcast messages to all connected clients instantly, with no page refresh. A built-in chat bot replies automatically to common messages, making it easy to demo the real-time flow on your own.

## ✨ Features

- **Real-time messaging** over WebSockets with Socket.io
- **Instant broadcast** of messages to every connected user
- **Built-in chat bot** that auto-replies to common messages
- Clean, responsive chat interface
- Simple Express server, ready for cloud deployment

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, socket.io-client |
| Backend | Node.js, Express, Socket.io |
| Protocol | WebSockets |

## 📁 Project Structure

```
project-real-chats/
├── backend/
│   └── server.js     # Express + Socket.io server, bot replies
└── frontend/
    └── src/
        ├── App.jsx       # Chat UI and socket connection
        └── main.jsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Bhargav9334/project-real-chats.git
cd project-real-chats
# Backend
cd backend
npm install
npm start

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

## ⚙️ How It Works

1. The client connects to the Socket.io server when the app loads.
2. Sending a message emits a `chat message` event to the server.
3. The server broadcasts it to all connected clients with `io.emit`.
4. The bot checks the message and broadcasts an automatic reply.

## 👤 Author

**Bhargav Sinha** — Software Engineer · Full-Stack MERN Developer

- GitHub: [@Bhargav9334](https://github.com/Bhargav9334)
- Portfolio: [portfolio-blush-sigma-22.vercel.app](https://portfolio-blush-sigma-22.vercel.app)
- Email: bhargavsinha93@gmail.com

If you found this project useful, consider giving it a ⭐
