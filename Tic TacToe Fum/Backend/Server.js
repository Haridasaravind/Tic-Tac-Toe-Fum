// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Game Variables
// let board = [

  
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

// let currentPlayer = 'X';
// let winner = '';
// let scoreX = 0;
// let scoreO = 0;

// /**
//  * Function to check for a winner on the game board.
//  * @param {number} boardSize - Size of the game board (3 for 3x3 or 4 for 4x4).
//  * @returns {string} - A string indicating the winner or an empty string if there is no winner.
//  */

// const checkWinner = (boardSize) => {
//   // Check rows and columns
//   for (let i = 0; i < boardSize; i++) {
//     if (
//       // Check rows
//       board[i].every((cell) => cell === board[i][0] && cell !== '') ||
//       // Check columns
//       board.every((row) => row[i] === board[0][i] && row[i] !== '')
//     ) {
//       return `${board[i][i]} is the winner!`; // Include a message indicating the winner
//     }
//   }

//   // Check diagonals
//   if (
//     // Check main diagonal
//     board.every((row, index) => row[index] === board[0][0] && row[index] !== '') ||
//     // Check anti-diagonal
//     board.every(
//       (row, index) => row[boardSize - 1 - index] === board[0][boardSize - 1] && row[boardSize - 1 - index] !== ''
//     )
//   ) {
//     return `${board[0][0]} is the winner!`; // Include a message indicating the winner
//   }

//   // Check additional diagonals for the 4x4 board
//   if (boardSize === 4) {
//     const centerSymbol = board[1][1];

//     // Check secondary diagonal
//     if (
//       board[0][boardSize - 1] === centerSymbol &&
//       board[1][boardSize - 2] === centerSymbol &&
//       board[2][boardSize - 3] === centerSymbol &&
//       board[3][boardSize - 4] === centerSymbol
//     ) {
//       return `${centerSymbol} is the winner!`; // Include a message indicating the winner
//     }

//     // Check anti-secondary diagonal
//     if (
//       board[0][0] === centerSymbol &&
//       board[1][1] === centerSymbol &&
//       board[2][2] === centerSymbol &&
//       board[3][3] === centerSymbol
//     ) {
//       return `${centerSymbol} is the winner!`; // Include a message indicating the winner
//     }
//   }

//   return '';
// };

// /**
//  * Function to extend the game board from 3x3 to 4x4 when the 3x3 board is full.
//  */
// const extendBoard = () => {
//   const is3x3BoardFull = board.every((row) => row.every((cell) => cell !== ''));

//   if (is3x3BoardFull) {
//     // If the 3x3 board is full, extend to a 4x4 board

//     // Create a new 4x4 board with empty values
//     const newBoard = Array.from({ length: 4 }, () => Array(4).fill(''));

//     // Copy the existing entries from the 3x3 board to the top-left corner of the new 4x4 board
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         newBoard[i][j] = board[i][j];
//       }
//     }

//     // Update the existing board with the new 4x4 board
//     board = newBoard;
//   }
// };

// /**
//  * Function to reset the game by clearing the board and resetting player-related variables.
//  */
// const resetGame = () => {
//   board = [
//     ['', '', ''],
//     ['', '', ''],
//     ['', '', ''],
//   ];
//   currentPlayer = 'X';
//   winner = '';
// };

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Endpoints

// /**
//  * GET /board
//  * Description: Retrieves the current state of the game board along with winner information and scores.
//  */
// app.get('/board', (req, res) => {
//   res.json({ board, winner, scoreX, scoreO, currentPlayer });
// });

// /**
//  * POST /move
//  * Description: Allows a player to make a move on the game board.
//  * Request Body Parameters:
//  *   - row: Row index where the player wants to make a move.
//  *   - col: Column index where the player wants to make a move.
//  */
// app.post('/move', (req, res) => {
//   const { row, col } = req.body;

//   const boardSize = board.length;

//   // Check if the move is valid
//   if (board[row] && board[row][col] === '' && !winner) {
//     board[row][col] = currentPlayer;

//     // Check for a winner
//     winner = checkWinner(boardSize);

//     // If no winner, check if the board is full
//     const isBoardFull = board.every((row) => row.every((cell) => cell !== ''));
//     if (!winner && isBoardFull && boardSize === 3) {
//       // If the board is full, extend the board
//       extendBoard();
//     } else if (!winner) {
//       // Switch to the next player if there's no winner
//       currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     } else {
//       // If there is a winner, update the scores and reset the game
//       if (winner === 'X') {
//         scoreX++;
//       } else {
//         scoreO++;
//       }

//       // Send the winner information in the response
//       res.json({ success: true, winner });

//       resetGame();
//       return; // Make sure to return here to prevent further execution
//     }

//     // Send a success response without winner information
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid move' });
//   }
// });

// /**
//  * POST /reset
//  * Description: Resets the game, clearing the board and resetting player scores.
//  */
// app.post('/reset', (req, res) => {
//   resetGame();
//   res.json({ success: true });
// });

// module.exports = { server: app, port, checkWinner, extendBoard, resetGame };


//New codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const TicTacFoeFum = require('./gamelogic');
// const app = express();
// const port = 5000;

// const initializeGameState = () => ({
//   board: [
//     ['', '', ''],
//     ['', '', ''],
//     ['', '', ''],
//   ],
//   currentPlayer: 'X',
//   winner: '',
//   scoreX: 0,
//   scoreO: 0,
// });

// const gameStates = {};

// app.use(cors());
// app.use(bodyParser.json());

// const ticTacGame = new TicTacFoeFum();

// app.get('/board', (req, res) => {
//   const game = req.query.game;
//   const gameState = gameStates[game] || initializeGameState();
//   res.json(gameState);
// });

// app.post('/move', (req, res) => {
//   const { game, row, col } = req.body;
//   const gameState = ticTacGame.makeMove(game, row, col);

//   if (!gameState.success) {
//     return res.status(400).json(gameState);
//   }

//   res.json({ success: true });
// });

// app.post('/reset', (req, res) => {
//   const { game } = req.body;
//   ticTacGame.resetGame(game);
//   res.json({ success: true });
// });

// const server = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = { server };






// // server.js
// const express = require('express'); 
// // Initializes an Express application instance.An Express application object which provides a robust set of features for building web applications.
// const bodyParser = require('body-parser');
// //Enables the application to parse incoming request data and make it available in req.body of the middleware.Commonly used for parsing JSON, URL-encoded, and other types of incoming request data.
// const cors = require('cors');
// //Enables cross-origin requests by setting appropriate headers to allow or restrict access to resources from different origins. Helps prevent errors when making AJAX requests or API calls from a client-side application to this server.
// const app = express();
// // Acts as the main interface to define routes, handle HTTP requests, and utilize middleware for processing incoming requests and generating responses.
// //Provides methods (app.get, app.post, etc.) to define endpoints and handle different types of HTTP requests.
// const port = 5000;

// // Game Variables : Represents the state and essential components of a Tic Tac Toe game.

// let board = // Represents the game board as a 3x3 grid, initially filled with empty strings ('').
// [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

// let currentPlayer = 'X'; //  Tracks the current player ('X' or 'O') taking their turn.
// let winner = ''; //Stores the symbol ('X' or 'O') of the current winner or an empty string ('') if there is no winner yet.
// let scoreX = 0; //Track the scores of players 'X'. Initially set to 0 for both players.
// let scoreO = 0; //Track the scores of players 'O'. Initially set to 0 for both players.

// /**
//  * Function to check for a winner on the game board.
//  * @param {number} boardSize - Size of the game board (3 for 3x3 or 4 for 4x4).
//  * @returns {string} - A string indicating the winner or an empty string if there is no winner.
//  */

// // This function will return the string for the matching or un matching 
// const checkWinner = (boardSize) => // boardSize: Size of the game board (either 3 or 4). 
// {
//   const checkTriplets = (triplets) => //Its helper function 
//   {
//     const symbols = ['X', 'O'];// Iterate through both 'X' and 'O'

//     for (const symbol of symbols)// Check if every cell in triplets array matches the symbol
//      {
//       if (triplets.every((cell) => cell === symbol)) // If all cells match, return the symbol
//       {
//         return symbol;
//       }
//     }
//     return '';// If no winning sequence found, return empty string
//   };

//   for (let i = 0; i < boardSize; i++) {
//     let result = '';

//     // Check rows and columns for triplets
//     const row = board[i];
//     const column = board.map((row) => row[i]);
//     result = checkTriplets(row);
//     if (result) 
//     {
//       return result;
//     }
//     result = checkTriplets(column);
//     if (result) 
//     {
//       return result;
//     }
//   }

//   // Check main diagonal for triplets
//   const mainDiagonal = board.map((row, index) => row[index]);
//   let result = checkTriplets(mainDiagonal);
//   if (result) {
//     return result;
//   }
//   // Check anti-diagonal for triplets
//   const antiDiagonal = board.map((row, index) => row[boardSize - 1 - index]);
//   result = checkTriplets(antiDiagonal);
//   if (result) {
//     return result;
//   }
//   return '';
// };



// /**
//  * Function to extend the game board from 3x3 to 4x4 when the 3x3 board is full.
//  */
// const extendBoard = () => {
//   const is3x3BoardFull = board.every((row) => row.every((cell) => cell !== ''));

//   if (is3x3BoardFull) {
//     // If the 3x3 board is full, extend to a 4x4 board

//     // Create a new 4x4 board with empty values
//     const newBoard = Array.from({ length: 4 }, () => Array(4).fill(''));

//     // Copy the existing entries from the 3x3 board to the top-left corner of the new 4x4 board
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         newBoard[i][j] = board[i][j];
//       }
//     }

//     // Update the existing board with the new 4x4 board
//     board = newBoard;
//   }
// };

// /**
//  * Function to reset the game by clearing the board and resetting player-related variables.
//  */
// const resetGame = () => 
// {
//   board = [
//     ['', '', ''],
//     ['', '', ''],
//     ['', '', ''],
//   ];
//   currentPlayer = 'X';
//   winner = '';
// };

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Endpoints

// /**
//  * GET /board
//  * Description: Retrieves the current state of the game board along with winner information and scores.
//  */
// app.get('/board', (req, res) => 
// {
//   res.json({ board, winner, scoreX, scoreO, currentPlayer });
// });

// /**
//  * POST /move
//  * Description: Allows a player to make a move on the game board.
//  * Request Body Parameters:
//  *   - row: Row index where the player wants to make a move.
//  *   - col: Column index where the player wants to make a move.
//  */
// app.post('/move', (req, res) => {
//   const { row, col } = req.body;

//   const boardSize = board.length;

//   // Check if the move is valid
//   if (board[row] && board[row][col] === '' && !winner) {
//     board[row][col] = currentPlayer;

//     // Check for a winner
//     winner = checkWinner(boardSize);

//     // If no winner, check if the board is full
//     const isBoardFull = board.every((row) => row.every((cell) => cell !== ''));
//     if (!winner && isBoardFull && boardSize === 3) {
//       // If the board is full, extend the board
//       extendBoard();
//     } else if (!winner) {
//       // Switch to the next player if there's no winner
//       currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     } else {
//       // If there is a winner, update the scores and reset the game
//       if (winner === 'X') {
//         scoreX++;
//       } else {
//         scoreO++;
//       }
//       // Send the winner information in the response
//       res.json({ success: true, winner });

//       resetGame();
//       return; // Make sure to return here to prevent further execution
//     }

//     // Send a success response without winner information
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid move' });
//   }
// });

// /**
//  * POST /reset
//  * Description: Resets the game, clearing the board and resetting player scores.
//  */
// app.post('/reset', (req, res) => {
//   resetGame();
//   res.json({ success: true });
// });

// module.exports = { server: app, port, checkWinner, extendBoard, resetGame };





//************************************************************************************************************ */

//  THIS IS MY NEW CODE :::

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

const TicTacFoeFum = require('./gamelogic');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const ticTacGame = new TicTacFoeFum(io);

app.get('/board', (req, res) => {
  const game = req.query.game;
  const gameState = ticTacGame.getGameState(game);
  res.json(gameState);
});

app.post('/move', (req, res) => {
  const { game, row, col } = req.body;
  const gameState = ticTacGame.makeMove(game, row, col);

  if (!gameState.success) {
    return res.status(400).json(gameState);
  }

  res.json({ success: true });
});

app.post('/reset', (req, res) => {
  const { game } = req.body;
  ticTacGame.resetGame(game);
  res.json({ success: true });
});

// Start the server
const server = http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { server };



