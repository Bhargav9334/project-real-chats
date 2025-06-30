const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log('✅ New user connected:', socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', { user: msg.user, text: msg.text });

    // Bot replies only to user messages
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

// 🌟 Enhanced bot reply logic
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

  // Default fallback reply
  return 'Interesting! Can you tell me more? 🤔';
};

server.listen(5001, () => {
  console.log('🚀 Server is running on http://localhost:5001');
});
