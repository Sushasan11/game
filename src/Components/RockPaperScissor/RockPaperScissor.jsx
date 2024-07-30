import React, { useState, useEffect, useCallback } from 'react';
import './RockPaperScissor.css'; 
import end_icon from '../Assets/end.png'; 

const RockPaperScissor = () => {
  // State for managing the current page
  const [currentPage, setCurrentPage] = useState('welcome');
  // State for tracking player score
  const [playerScore, setPlayerScore] = useState(0);
  // State for tracking computer score
  const [computerScore, setComputerScore] = useState(0);
  // State for tracking tie score
  const [tieScore, setTieScore] = useState(0);
  // State for displaying the game result
  const [result, setResult] = useState('IT\'S A TIE!!');

  // Function to play the game with the player's choice
  const playGame = (playerChoice) => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultMessage;

    if (playerChoice === computerChoice) {
      setTieScore(tieScore + 1);
      resultMessage = 'IT\'S A TIE!!';
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setPlayerScore(playerScore + 1);
      resultMessage = 'PLAYER WINS!!';
    } else {
      setComputerScore(computerScore + 1);
      resultMessage = 'COMPUTER WINS!!';
    }

    setResult(resultMessage);
  };

  // Function to reset the game scores and result
  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setTieScore(0);
    setResult('IT\'S A TIE!!');
  };

  // Function to handle key press events
  const handleKeyPress = useCallback((event) => {
    if (event.code === 'Space') {
      if (currentPage === 'welcome') {
        setCurrentPage('game');
      } else if (currentPage === 'game') {
        setCurrentPage('end');
      } else if (currentPage === 'end') {
        setCurrentPage('welcome');
      }
    }
  }, [currentPage]);

  // Function to handle touch start events for mobile devices
  const handleTouchStart = useCallback(() => {
    if (currentPage === 'welcome') {
      setCurrentPage('game');
    } else if (currentPage === 'game') {
      setCurrentPage('end');
    } else if (currentPage === 'end') {
      setCurrentPage('welcome');
    }
  }, [currentPage]);

  // Adding event listeners for key press and touch start
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleKeyPress, handleTouchStart]);

  return (
    <div>
      {/* Welcome Page Section */}
      <div id="welcomePage" className={`page ${currentPage === 'welcome' ? 'active' : ''}`}>
        <h1>Welcome to the Game</h1>
        <p>Press space or tap to start the game</p>
      </div>

      {/* Game Page Section */}
      <div id="gamePage" className={`page ${currentPage === 'game' ? 'active' : ''}`}>
        <h1>Rock-Paper-Scissors</h1>
        <div className="choices">
          <button onClick={() => playGame('rock')}>🪨</button>
          <button onClick={() => playGame('paper')}>📃</button>
          <button onClick={() => playGame('scissors')}>✂️</button>
        </div>
        <div id="playerdisplay">PLAYER: </div>
        <div id="computerdisplay">COMPUTER: </div>
        <div id="resultdisplay">{result}</div>
        <div className="scoredisplay">Player Score: <span id="playerScoreDisplay">{playerScore}</span></div>
        <div className="scoredisplay">Computer Score: <span id="computerScoreDisplay">{computerScore}</span></div>
        <div className="scoredisplay">Tie Score: <span id="tieScoreDisplay">{tieScore}</span></div>
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>

      {/* End Page Section */}
      <div id="endPage" className={`page ${currentPage === 'end' ? 'active' : ''}`}>
        <img src={end_icon} alt="End" className="full-image" />
        <p>Press space or tap to go back to the welcome page</p>
      </div>
    </div>
  );
};

export default RockPaperScissor;