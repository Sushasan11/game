import React, { useState, useEffect } from 'react';
import './RockPaperScissor.css'; 
import end_icon from '../Assets/end.png'; 

const RockPaperScissor = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [result, setResult] = useState('IT\'S A TIE!!');

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

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setTieScore(0);
    setResult('IT\'S A TIE!!');
  };

  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      if (currentPage === 'welcome') {
        setCurrentPage('game');
      } else if (currentPage === 'game') {
        setCurrentPage('end');
      } else if (currentPage === 'end') {
        setCurrentPage('welcome');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentPage]);

  return (
    <div>
      {/* Welcome Page Section */}
      <div id="welcomePage" className={`page ${currentPage === 'welcome' ? 'active' : ''}`}>
        <h1>Welcome to the Game</h1>
        <p>Press space to start the game</p>
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
        <img src={end_icon} alt="End Image" className="full-image" />
        <p>Press space to go back to the welcome page</p>
      </div>
    </div>
  );
};

export default RockPaperScissor;
