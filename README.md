# Multiplayer Button Game

## Overview

The Multiplayer Button Game is a real-time, passive income simulation game where players can press colored buttons to earn virtual money. Each button has a unique payout structure, and earnings are calculated based on the actions of all players in the game.

## Features

- Real-time multiplayer interaction
- Five different buttons with unique payout structures
- Passive income generation
- Live leaderboard
- Active user list
- Account deletion on disconnection for a fresh start each session

## Technologies Used

- Node.js
- Express.js
- Socket.io
- MongoDB
- Mongoose

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have installed MongoDB and it's running on your local machine

## Installation and Setup

1. Clone the repository:
   ```
git clone https://github.com/Tr6nt0/multiplayer-button-game.git   ```


2. Navigate to the project directory:
   ```
   cd multiplayer-button-game
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the MongoDB service on your local machine.

5. Start the game server:
   ```
   npm start
   ```

6. Open your web browser and go to `http://localhost:3000` to play the game.

## How to Play

1. Enter a username and click "Start New Game".
2. Click on any of the five colored buttons to select it.
3. Your selected button will passively generate income based on its unique rules and the actions of other players.
4. The leaderboard shows the top earners, and the active users list shows who's currently playing.
5. Closing the browser window or navigating away will end your session and delete your account.

## Button Rules

- 🔴 Red button: Earns $1 every time someone presses blue
- 🔵 Blue button: Earns $5 every time someone presses yellow
- 🟡 Yellow button: Earns $3 every time someone presses purple
- 🟣 Purple button: Earns $0.50 every time someone presses purple
- ⚪ White button: Earns $0.10 every time someone presses a primary color (red, blue, or yellow)

## Contributing

Contributions to the Multiplayer Button Game are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

If you want to contact me, you can reach me at t159@umbc.edu

## Acknowledgements

- Thanks to all the players who have tested and enjoyed the game!
- Special thanks to the open-source community for the amazing tools and libraries used in this project.
