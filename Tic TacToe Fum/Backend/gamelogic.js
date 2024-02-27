// class TicTacFoeFum {
//   constructor() {
//     this.gameStates = {}; // Object to hold multiple game sessions
//   }
//   initializeGameState() {
//     return {
//       board: [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', ''],
//       ],
//       currentPlayer: 'X',
//       winner: '',
//       scoreX: 0,
//       scoreO: 0,
//     };
//   }
//   getGameState(game) {
//     return this.gameStates[game] || this.initializeGameState();
//   }

//   makeMove(game, row, col) {
//     const gameState = this.gameStates[game] || this.initializeGameState();
//     if (this.gameStates.winner || this.gameStates.board[row][col] !== '') {
//       return { ...this.gameStates, success: false, message: 'Invalid move' };
//     }
//     this.gameStates.board[row][col] = this.gameStates.currentPlayer;
//     this.gameStates.winner = this.checkWinner(this.gameStates.board.length);
//     if (
//       !this.gameStates.winner &&
//       this.isBoardFull(this.gameStates.board) &&
//       this.gameStates.board.length === 3
//     ) {
//       this.extendBoard();
//     } else if (!this.gameStates.winner) {
//       this.gameStates.currentPlayer =
//         this.gameStates.currentPlayer === 'X' ? 'O' : 'X';
//     } else {
//       this.updateScores();
//       this.resetGame();
//     }
//     this.gameStates[game] = gameState;
//     return this.gameStates;
//   }

//   // Game Logic Functions
//   checkWinner = (board) => {
//     // Logic to check for a winner
//     const checkTriplets = (triplets) => {
//       const symbols = ['X', 'O'];
//       for (const symbol of symbols) {
//         if (triplets.every((cell) => cell === symbol)) {
//           return symbol;
//         }
//       }
//       return '';
//     };
//     for (let i = 0; i < board.length; i++) {
//       let result = '';
//       // Check rows and columns for triplets
//       const row = board[i];
//       const column = board.map((row) => row[i]);
//       result = checkTriplets(row);
//       if (result) {
//         return result;
//       }
//       result = checkTriplets(column);
//       if (result) {
//         return result;
//       }
//     }
//     // Check main diagonal for triplets
//     const mainDiagonal = board.map((row, index) => row[index]);
//     let result = checkTriplets(mainDiagonal);
//     if (result) {
//       return result;
//     }
//     // Check anti-diagonal for triplets
//     const antiDiagonal = board.map((row, index) => row[board.length - 1 - index]);
//     result = checkTriplets(antiDiagonal);
//     if (result) {
//       return result;
//     }
//     return '';
//   };

//   extendBoard = (board, direction) => {
//     // Logic to extend the board along a given direction
//     if (direction === 'random') {
//       const corners = [
//         [0, 0], // Top-left corner
//         [0, board.length - 1], // Top-right corner
//         [board.length - 1, 0], // Bottom-left corner
//         [board.length - 1, board.length - 1], // Bottom-right corner
//       ];

//       // Select a random corner
//       const randomCorner = corners[Math.floor(Math.random() * corners.length)];

//       const [x, y] = randomCorner;
//       if (x === 0 && y === 0) {
//         // Extend towards the bottom-right direction
//         // Add a new row at the bottom
//         board.push(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the end of each existing row
//         board.forEach(row => row.push(''));
//       } else if (x === 0 && y === board.length - 1) {
//         // Extend towards the bottom-left direction
//         // Add a new row at the bottom
//         board.push(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the beginning of each existing row
//         board.forEach(row => row.unshift(''));
//       } else if (x === board.length - 1 && y === 0) {
//         // Extend towards the top-right direction
//         // Add a new row at the top
//         board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the end of each existing row
//         board.forEach(row => row.push(''));
//       } else if (x === board.length - 1 && y === board.length - 1) {
//         // Extend towards the top-left direction
//         // Add a new row at the top
//         board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the beginning of each existing row
//         board.forEach(row => row.unshift(''));
//       }
//     }
//   };

//   calculateScores(board) {
//     const checkTriplets = (triplets) => {
//       const symbols = ['X', 'O'];
//       for (const symbol of symbols) {
//         if (triplets.every((cell) => cell === symbol)) {
//           return symbol;
//         }
//       }
//       return '';
//     };

//     const calculateScoreForLine = (line) => {
//       const triplets = [];
//       for (let i = 0; i <= line.length - 3; i++) {
//         triplets.push(line.slice(i, i + 3));
//       }
//       return triplets.reduce((totalScore, triplet) => {
//         const winner = checkTriplets(triplet);
//         if (winner) {
//           return winner === 'X' ? totalScore + 1 : totalScore - 1; // +1 for X, -1 for O
//         }
//         return totalScore;
//       }, 0);
//     };

//     const calculateScoreForBoard = (board) => {
//       let totalScore = 0;

//       // Rows
//       for (const row of board) {
//         totalScore += calculateScoreForLine(row);
//       }

//       // Columns
//       for (let i = 0; i < board.length; i++) {
//         const column = board.map(row => row[i]);
//         totalScore += calculateScoreForLine(column);
//       }

//       // Diagonals
//       const diagonals = [
//         [board[0][0], board[1][1], board[2][2]],
//         [board[0][2], board[1][1], board[2][0]]
//       ];
//       for (const diagonal of diagonals) {
//         totalScore += calculateScoreForLine(diagonal);
//       }

//       return totalScore;
//     };

//     const score = calculateScoreForBoard(board);

//     return score;
//   }


//   resetGame = (gameState) => {
//     // Logic to reset the game state
//     gameState.board = [
//       ['', '', ''],
//       ['', '', ''],
//       ['', '', ''],
//     ];
//     gameState.currentPlayer = 'X';
//     gameState.winner = '';
//     gameState.scoreX = 0;
//     gameState.scoreO = 0;
//   };
// }
// module.exports = TicTacFoeFum;



//////////////////////////////////////////////////////////////////////////////////////////////////////MY OLD CODE ::

// class TicTacFoeFum {
//   constructor() {
//     this.gameStates = {};
//   }

//   initializeGameState() {
//     return {
//       board: [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', ''],
//       ],
//       currentPlayer: 'X',
//       winner: '',
//       scoreX: 0,
//       scoreO: 0,
//     };
//   }

//   getGameState(game) {
//     return this.gameStates[game] || this.initializeGameState();
//   }

//   makeMove(game, row, col) {
//     const gameState = this.gameStates[game] || this.initializeGameState();
//     if (gameState.winner || gameState.board[row][col] !== '') {
//       return { ...gameState, success: false, message: 'Invalid move' };
//     }
//     gameState.board[row][col] = gameState.currentPlayer;
//     gameState.winner = this.checkWinner(gameState.board);
//     if (
//       !gameState.winner &&
//       this.isBoardFull(gameState.board) &&
//       gameState.board.length === 3
//     ) {
//       this.extendBoard(gameState.board, 'random');
//     } else if (!gameState.winner) {
//       gameState.currentPlayer =
//         gameState.currentPlayer === 'X' ? 'O' : 'X';
//     } else {
//       this.updateScores(gameState);
//       this.resetGame(gameState);
//     }
//     this.gameStates[game] = gameState;
//     return { ...gameState, success: true };
//   }

//   isBoardFull(board) {
//     for (let row of board) {
//       for (let cell of row) {
//         if (cell === '') {
//           return false;
//         }
//       }
//     }
//     return true;
//   }



//   // Game Logic Functions
//   checkWinner(board) {
//     // Logic to check for a winner
//     const checkTriplets = (triplets) => {
//       const symbols = ['X', 'O'];
//       for (const symbol of symbols) {
//         if (triplets.every((cell) => cell === symbol)) {
//           return symbol;
//         }
//       }
//       return '';
//     };
//     for (let i = 0; i < board.length; i++) {
//       let result = '';
//       // Check rows and columns for triplets
//       const row = board[i];
//       const column = board.map((row) => row[i]);
//       result = checkTriplets(row);
//       if (result) {
//         return result;
//       }
//       result = checkTriplets(column);
//       if (result) {
//         return result;
//       }
//     }
//     // Check main diagonal for triplets
//     const mainDiagonal = board.map((row, index) => row[index]);
//     let result = checkTriplets(mainDiagonal);
//     if (result) {
//       return result;
//     }
//     // Check anti-diagonal for triplets
//     const antiDiagonal = board.map((row, index) => row[board.length - 1 - index]);
//     result = checkTriplets(antiDiagonal);
//     if (result) {
//       return result;
//     }
//     return '';
//   }

//   extendBoard(board, direction) {
//     // Logic to extend the board along a given direction
//     if (direction === 'random') {
//       const corners = [
//         [0, 0], // Top-left corner
//         [0, board.length - 1], // Top-right corner
//         [board.length - 1, 0], // Bottom-left corner
//         [board.length - 1, board.length - 1], // Bottom-right corner
//       ];

//       // Select a random corner
//       const randomCorner = corners[Math.floor(Math.random() * corners.length)];

//       const [x, y] = randomCorner;
//       if (x === 0 && y === 0) {
//         // Extend towards the bottom-right direction
//         // Add a new row at the bottom
//         board.push(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the end of each existing row
//         board.forEach(row => row.push(''));
//       } else if (x === 0 && y === board.length - 1) {
//         // Extend towards the bottom-left direction
//         // Add a new row at the bottom
//         board.push(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the beginning of each existing row
//         board.forEach(row => row.unshift(''));
//       } else if (x === board.length - 1 && y === 0) {
//         // Extend towards the top-right direction
//         // Add a new row at the top
//         board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the end of each existing row
//         board.forEach(row => row.push(''));
//       } else if (x === board.length - 1 && y === board.length - 1) {
//         // Extend towards the top-left direction
//         // Add a new row at the top
//         board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//         // Add an empty string to the beginning of each existing row
//         board.forEach(row => row.unshift(''));
//       }
//     }
//   }

//   calculateScores(board) {
//     const checkTriplets = (triplets) => {
//       const symbols = ['X', 'O'];
//       for (const symbol of symbols) {
//         if (triplets.every((cell) => cell === symbol)) {
//           return symbol;
//         }
//       }
//       return '';
//     };

//     const calculateScoreForLine = (line) => {
//       const triplets = [];
//       for (let i = 0; i <= line.length - 3; i++) {
//         triplets.push(line.slice(i, i + 3));
//       }
//       return triplets.reduce((totalScore, triplet) => {
//         const winner = checkTriplets(triplet);
//         if (winner) {
//           return winner === 'X' ? totalScore + 1 : totalScore - 1; // +1 for X, -1 for O
//         }
//         return totalScore;
//       }, 0);
//     };

//     const calculateScoreForBoard = (board) => {
//       let totalScore = 0;

//       // Rows
//       for (const row of board) {
//         totalScore += calculateScoreForLine(row);
//       }

//       // Columns
//       for (let i = 0; i < board.length; i++) {
//         const column = board.map(row => row[i]);
//         totalScore += calculateScoreForLine(column);
//       }

//       // Diagonals
//       const diagonals = [
//         [board[0][0], board[1][1], board[2][2]],
//         [board[0][2], board[1][1], board[2][0]]
//       ];
//       for (const diagonal of diagonals) {
//         totalScore += calculateScoreForLine(diagonal);
//       }

//       return totalScore;
//     };

//     const score = calculateScoreForBoard(board);

//     return score;
//   }

//   resetGame(game) {
//     this.gameStates[game].board = [
//       ['', '', ''],
//       ['', '', ''],
//       ['', '', ''],
//     ];
//     this.gameStates[game].currentPlayer = 'X';
//     this.gameStates[game].winner = '';
//     this.gameStates[game].scoreX = 0;
//     this.gameStates[game].scoreO = 0;
//   }
  
// }

// module.exports = TicTacFoeFum;





//***********************************************************************************************************************************************
// NEW LOGIC GIVEN BY CHATGPT :




//*******************************************************************************************
// class TicTacFoeFum {
//   constructor(io) {
//     this.io = io;
//     this.gameStates = {};
//     this.initializeSocketConnection();
//   }

//   initializeGameState() {
//     return {
//       board: [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', ''],
//       ],
//       currentPlayer: 'X',
//       winner: '',
//       scoreX: 0,
//       scoreO: 0,
//     };
//   }

//   getGameState(game) {
//     return this.gameStates[game] || this.initializeGameState();
//   }

//   makeMove(game, row, col) {
//     const gameState = this.gameStates[game] || this.initializeGameState();

//     if (gameState.winner || gameState.board[row][col] !== '') {
//       return { ...gameState, success: false, message: 'Invalid move' };
//     }

//     gameState.board[row][col] = gameState.currentPlayer;
//     gameState.winner = this.checkWinner(gameState.board);

//     if (!gameState.winner && this.isBoardFull(gameState.board) && gameState.board.length === 3) {
//       this.extendBoard(game, 'random');
//     } else if (!gameState.winner) {
//       gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
//     } else {
//       this.updateScores(gameState);
//       this.resetGame(game);
//     }

//     this.gameStates[game] = gameState;
//     this.io.to(game).emit('updateGame', gameState); // Emit event to update all clients in the same game

//     return { ...gameState, success: true };
//   }

//   isBoardFull(board) {
//     for (let row of board) {
//       for (let cell of row) {
//         if (cell === '') {
//           return false;
//         }
//       }
//     }
//     return true;
//   }

//   checkWinner(board) 
//   {
//     const checkTriplets = (triplets) => {
//       const symbols = ['X', 'O'];
//       for (const symbol of symbols) {
//         if (triplets.every((cell) => cell === symbol)) {
//           return symbol;
//         }
//       }
//       return '';
//   };

//     for (let i = 0; i < board.length; i++) {
//       let result = '';
//       const row = board[i];
//       const column = board.map((row) => row[i]);
//       result = checkTriplets(row);
//       if (result) {
//         return result;
//       }
//       result = checkTriplets(column);
//       if (result) {
//         return result;
//       }
//     }

//     const mainDiagonal = board.map((row, index) => row[index]);
//     let result = checkTriplets(mainDiagonal);
//     if (result) {
//       return result;
//     }

//     const antiDiagonal = board.map((row, index) => row[board.length - 1 - index]);
//     result = checkTriplets(antiDiagonal);
//     if (result) {
//       return result;
//     }
//     return '';
//   }

//   extendBoard(game, direction) 
//   {
//     const board = this.gameStates[game].board;
//     if (direction === 'random') {
//       const corners = [
//         [0, 0], // Top-left corner
//         [0, board.length - 1], // Top-right corner
//         [board.length - 1, 0], // Bottom-left corner
//         [board.length - 1, board.length - 1], // Bottom-right corner
//       ];

//       const randomCorner = corners[Math.floor(Math.random() * corners.length)];
//       const [x, y] = randomCorner;

//       if (x === 0 && y === 0) {
//         this.extendBoardDirection(game, 'bottomRight');
//       } else if (x === 0 && y === board.length - 1) {
//         this.extendBoardDirection(game, 'bottomLeft');
//       } else if (x === board.length - 1 && y === 0) {
//         this.extendBoardDirection(game, 'topRight');
//       } else if (x === board.length - 1 && y === board.length - 1) {
//         this.extendBoardDirection(game, 'topLeft');
//       }
//     }
//   }

//   extendBoardDirection(game, direction) {
//     const gameState = this.gameStates[game];
//     const board = gameState.board;

//     if (direction === 'bottomRight') {
//       board.push(Array.from({ length: board.length + 1 }, () => ''));
//       board.forEach(row => row.push(''));
//     } else if (direction === 'bottomLeft') {
//       board.push(Array.from({ length: board.length + 1 }, () => ''));
//       board.forEach(row => row.unshift(''));
//     } else if (direction === 'topRight') {
//       board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//       board.forEach(row => row.push(''));
//     } else if (direction === 'topLeft') {
//       board.unshift(Array.from({ length: board.length + 1 }, () => ''));
//       board.forEach(row => row.unshift(''));
//     }
//   }

//   updateScores(gameState) {
//     const board = gameState.board;

//     const calculateScoreForLine = (line) => {
//       const triplets = [];
//       for (let i = 0; i <= line.length - 3; i++) {
//         triplets.push(line.slice(i, i + 3));
//       }
//       return triplets.reduce((totalScore, triplet) => {
//         const winner = this.checkTriplets(triplet);
//         if (winner) {
//           return winner === 'X' ? totalScore + 1 : totalScore - 1; // +1 for X, -1 for O
//         }
//         return totalScore;
//       }, 0);
//     };

//     const calculateScoreForBoard = (board) => {
//       let totalScore = 0;

//       for (const row of board) {
//         totalScore += calculateScoreForLine(row);
//       }

//       for (let i = 0; i < board.length; i++) {
//         const column = board.map(row => row[i]);
//         totalScore += calculateScoreForLine(column);
//       }

//       const diagonals = [
//         [board[0][0], board[1][1], board[2][2]],
//         [board[0][2], board[1][1], board[2][0]]
//       ];
//       for (const diagonal of diagonals) {
//         totalScore += calculateScoreForLine(diagonal);
//       }

//       return totalScore;
//     };

//     const score = calculateScoreForBoard(board);

//     gameState.scoreX = score;
//     gameState.scoreO = -score; // Invert score for player O

//     return gameState;
//   }

//   resetGame(game)
//   {
//     this.gameStates[game] = this.initializeGameState();
//     this.io.to(game).emit('updateGame', this.gameStates[game]); // Emit event to update all clients in the same game
//   }

//   initializeSocketConnection() 
//   {
//     this.io.on('connection', (socket) => {
//       console.log('A user connected');

//       socket.on('joinGame', (game) => {
//         socket.join(game);
//         console.log(`User joined game: ${game}`);
//       });

//       socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
//     });
//   }
// }
// module.exports = TicTacFoeFum;



//*** Another way of implementing in  */
class TicTacFoeFum {
  constructor(io) {
    this.io = io;
    this.gameStates = {};
    this.initializeSocketConnection();
  }

  initializeGameState() {
    return {
      board: Array.from({ length: 3 }, () => Array(3).fill('')),
      currentPlayer: 'X',
      winner: '',
      scoreX: 0,
      scoreO: 0,
    };
  }

  getGameState(game) {
    return this.gameStates[game] || this.initializeGameState();
  }

  makeMove(game, row, col) {
    const gameState = this.gameStates[game] || this.initializeGameState();

    if (gameState.winner || gameState.board[row][col] !== '') {
      return { ...gameState, success: false, message: 'Invalid move' };
    }

    gameState.board[row][col] = gameState.currentPlayer;
    gameState.winner = this.checkWinner(gameState.board);

    if (!gameState.winner && this.isBoardFull(gameState.board) && gameState.board.length === 3) {
      this.extendBoard(game, 'random');
    } else if (!gameState.winner) {
      gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    } else {
      this.updateScores(gameState);
      this.resetGame(game);
    }

    this.gameStates[game] = gameState;
    this.io.to(game).emit('updateGame', gameState);

    return { ...gameState, success: true };
  }

  isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== ''));
  }

  checkWinner(board) {
    const lines = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return '';
  }

  extendBoard(game, direction) {
    const board = this.gameStates[game].board;

    if (direction === 'random') {
      const corners = [
        [0, 0], // Top-left corner
        [0, board.length - 1], // Top-right corner
        [board.length - 1, 0], // Bottom-left corner
        [board.length - 1, board.length - 1], // Bottom-right corner
      ];

      const randomCorner = corners[Math.floor(Math.random() * corners.length)];
      const [x, y] = randomCorner;

      if (x === 0 && y === 0) {
        this.extendBoardDirection(game, 'bottomRight');
      } else if (x === 0 && y === board.length - 1) {
        this.extendBoardDirection(game, 'bottomLeft');
      } else if (x === board.length - 1 && y === 0) {
        this.extendBoardDirection(game, 'topRight');
      } else if (x === board.length - 1 && y === board.length - 1) {
        this.extendBoardDirection(game, 'topLeft');
      }
    }
  }

  extendBoardDirection(game, direction) {
    const gameState = this.gameStates[game];
    const board = gameState.board;

    if (direction === 'bottomRight') {
      board.push(Array.from({ length: board.length }, () => ''));
      board.forEach(row => row.push(''));
    } else if (direction === 'bottomLeft') {
      board.push(Array.from({ length: board.length }, () => ''));
      board.forEach(row => row.unshift(''));
    } else if (direction === 'topRight') {
      board.unshift(Array.from({ length: board.length }, () => ''));
      board.forEach(row => row.push(''));
    } else if (direction === 'topLeft') {
      board.unshift(Array.from({ length: board.length }, () => ''));
      board.forEach(row => row.unshift(''));
    }
  }

  updateScores(gameState) {
    const board = gameState.board;
    const calculateScoreForLine = (line) => {
      const symbols = ['X', 'O'];
      for (const symbol of symbols) {
        if (line.every(cell => cell === symbol)) {
          return symbol === 'X' ? 1 : -1;
        }
      }
      return 0;
    };

    const calculateScoreForBoard = () => {
      let totalScore = 0;

      for (const row of board) {
        totalScore += calculateScoreForLine(row);
      }

      for (let i = 0; i < board.length; i++) {
        const column = board.map(row => row[i]);
        totalScore += calculateScoreForLine(column);
      }

      const diagonals = [
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
      ];

      for (const diagonal of diagonals) {
        totalScore += calculateScoreForLine(diagonal);
      }

      return totalScore;
    };

    const score = calculateScoreForBoard();
    gameState.scoreX = score;
    gameState.scoreO = -score; // Invert score for player O

    return gameState;
  }
  
  resetGame(game)
  {
    this.gameStates[game] = this.initializeGameState();
    this.io.to(game).emit('updateGame', this.gameStates[game]);
  }

  initializeSocketConnection() 
  {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('joinGame', (game) => {
        socket.join(game);
        console.log(`User joined game: ${game}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}

module.exports = TicTacFoeFum;
