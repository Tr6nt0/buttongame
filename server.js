const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buttongame', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  socketId: String,
  username: String,
  currentButton: String,
  earnings: Number
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('login', async (username) => {
    await User.create({ socketId: socket.id, username, currentButton: null, earnings: 0 });
    io.emit('userJoined', username);
    io.emit('updateActiveUsers', await getActiveUsers());
  });

  socket.on('pressButton', async (data) => {
    const { button } = data;
    await User.findOneAndUpdate({ socketId: socket.id }, { currentButton: button });
    io.emit('buttonUpdate', { socketId: socket.id, button });
  });

  socket.on('disconnect', async () => {
    const user = await User.findOne({ socketId: socket.id });
    if (user) {
      io.emit('userLeft', user.username);
      await User.deleteOne({ socketId: socket.id });
      io.emit('updateActiveUsers', await getActiveUsers());
    }
    console.log('User disconnected and account deleted');
  });

  socket.on('getActiveUsers', async (callback) => {
    callback(await getActiveUsers());
  });
});

async function getActiveUsers() {
  return await User.find({}, 'username');
}

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Game loop
setInterval(async () => {
  const users = await User.find();
  users.forEach(async (user) => {
    let earning = 0;
    switch (user.currentButton) {
      case 'red':
        if (Math.random() < 0.2) earning = 1; // 20% chance for $1
        break;
      case 'blue':
        if (Math.random() < 0.2) earning = 5; // 20% chance for $5
        break;
      case 'yellow':
        if (Math.random() < 0.2) earning = 3; // 20% chance for $3
        break;
      case 'purple':
        if (Math.random() < 0.2) earning = 0.5; // 20% chance for $0.50
        break;
      case 'white':
        if (Math.random() < 0.6) earning = 0.1; // 60% chance for $0.10
        break;
    }
    user.earnings += earning;
    await user.save();
  });
  io.emit('earningsUpdate', users);
}, 1000);
