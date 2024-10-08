const socket = io();
let username;

function login() {
    username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a username');
        return;
    }
    document.getElementById('login').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    socket.emit('login', username);
}

function pressButton(color) {
    socket.emit('pressButton', { button: color });
    document.getElementById('currentButton').textContent = `Current Button: ${color}`;
}

socket.on('userJoined', (user) => {
    console.log(`${user} joined the game`);
});

socket.on('userLeft', (user) => {
    console.log(`${user} left the game`);
});

socket.on('buttonUpdate', (data) => {
    // You could add visual feedback here if you want to show what buttons other players are pressing
});

socket.on('earningsUpdate', (users) => {
    const user = users.find(u => u.socketId === socket.id);
    if (user) {
        document.getElementById('earnings').textContent = `Earnings: $${user.earnings.toFixed(2)}`;
    }
    updateLeaderboard(users);
});

socket.on('updateActiveUsers', (users) => {
    const activeUsersHTML = users.map(user => `<div>${user.username}</div>`).join('');
    document.getElementById('activeUsers').innerHTML = activeUsersHTML;
});

function updateLeaderboard(users) {
    const leaderboard = users.sort((a, b) => b.earnings - a.earnings).slice(0, 10);
    const leaderboardHTML = leaderboard.map(user => 
        `<div>${user.username}: $${user.earnings.toFixed(2)}</div>`
    ).join('');
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}

window.onbeforeunload = function() {
    return "Leaving this page will end your game session. Are you sure?";
};
