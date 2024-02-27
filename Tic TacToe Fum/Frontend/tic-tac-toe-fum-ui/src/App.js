// src/App.js
import { io } from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

/**
 * React functional component for the Tic Tac Toe game application.
 * @returns {JSX.Element} The JSX representation of the component.
 */
const App = () => {
  // State variables to manage the game board, winner, and scores.
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState('');
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const isMounted = useRef(true);

   // Initialize a socket connection
   const socket = io('http://localhost:5000');

  useEffect(() => {
    fetchData();
    // Listen for updates from the server
    socket.on('updateGame', (updatedGame) => {
      if (isMounted.current) {
        setBoard(updatedGame.board);
        setWinner(updatedGame.winner);
        setScoreX(updatedGame.scoreX);
        setScoreO(updatedGame.scoreO);
      }
    });
    return () => {
      isMounted.current = false;
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/board', { timeout: 5000 });
      if (isMounted.current) {
        setBoard(response.data.board);
        setWinner(response.data.winner);
        setScoreX(response.data.scoreX);
        setScoreO(response.data.scoreO);
      }
    } catch (error) {
      if (isMounted.current) {
        if (axios.isCancel(error)) {
          console.error('Request timed out:', error);
        } else {
          console.error('Error fetching board:', error);
        }
      }
    }
  };

  const makeMove = async (row, col) => {
    try {
      await axios.post('http://localhost:5000/move', { row, col });
      fetchData();
    } catch (error) {
      console.error('Error making move:', error);
      // Add user-friendly error handling, such as displaying a notification to the user.
    }
  };

  const resetGame = async () => {
    try {
      await axios.post('http://localhost:5000/reset');
      fetchData();
    } catch (error) {
      console.error('Error resetting game:', error);
      // Add user-friendly error handling, such as displaying a notification to the user.
    }
  };

  /**
   * JSX representation of the Tic Tac Toe game application.
   * @returns {JSX.Element} The JSX representation of the component.
   */
  return (
    <div className='container'>
      <h1>Tic Tac Toe Fum</h1>
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => makeMove(rowIndex, colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>Winner: {winner}</p>
      <p>Score X: {scoreX}</p>
      <p>Score O: {scoreO}</p>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;
