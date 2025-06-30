const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // or build for CRA
app.use(cors());

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('✅ New user connected:', socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', { user: msg.user, text: msg.text });

    if (msg.user !== 'Bot') {
      const reply = generateBotReply(msg.text);
      setTimeout(() => {
        io.emit('chat message', { user: 'Bot', text: reply });
      }, 1000);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Bot reply logic
const generateBotReply = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hlo')) {
    return 'Hey there! 😊 How can I assist you today?';
  }
  if (msg.includes('how are you')) {
    return 'I’m just a bot, but I’m doing fantastic! Thanks for asking. 🤖';
  }
  if (msg.includes('your name')) {
    return 'I’m ChatBot 🤖, your virtual assistant!';
  }
  if (msg.includes('project')) {
    return 'Sure! Start by planning what you want to build, then break it into features. Need ideas or tech stack advice?';
  }
  if (msg.includes('help')) {
    return 'Of course! Just tell me what you’re stuck with. I’ll try my best to guide you! 💡';
  }
  if (msg.includes('thanks') || msg.includes('thank you')) {
    return 'You’re welcome! Happy to help! 😊';
  }
  if (msg.includes('bye')) {
    return 'Goodbye! 👋 Have a great day!';
  }
  return 'Interesting! Can you tell me more? 🤔';
};

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Use dynamic port for Render
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
