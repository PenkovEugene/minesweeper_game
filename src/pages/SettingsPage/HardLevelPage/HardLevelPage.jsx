import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CongratulationsPopup from "../../../components/congratulationsPopup/CongratulationsPopup";
import DefeatPopup from "../../../components/defeatPopup/DefeatPopup";
import './hardLevelPage.css'

const numRows = 16;
const numCols = 32;
const numMines = 64;
const time = 6000;


function initializeGrid () {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push({
        row: i,
        col: j,
        hasMine: false,
        mineActive: false,
        isOpen: false,
        neighborMines: 0,
        hasFlag: false,
        hasQuestion: false,
      });
    }
    grid.push(row);
  }
  return grid;
}

function placeMines(grid) {
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    if (!grid[row][col].hasMine) {
      grid[row][col].hasMine = true;
      minesPlaced++;
    }
  }
}

function countNeighborMines (grid) {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (!grid[i][j].hasMine) {
        let count = 0;
        for (let ni = i - 1; ni <= i + 1; ni++) {
          for (let nj = j - 1; nj <= j + 1; nj++) {
            if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && grid[ni][nj].hasMine) {
              count++;
            }
          }
        }
        grid[i][j].neighborMines = count;

        if (count > 0) {
          grid[i][j].numberClass = `number-${count}`;
        }
      }
    }
  }
}

function revealEmpty (grid, row, col) {
  if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col].isOpen) return;
  if (grid[row][col].hasMine) {
    grid[row][col].mineActive = true;
    return;
  } 
  grid[row][col].isOpen = true;
  if (grid[row][col].neighborMines === 0) {
    for (let ni = row - 1; ni <= row + 1; ni++) {
      for (let nj = col - 1; nj <= col + 1; nj++) {
        revealEmpty(grid, ni, nj);
      }
    }
  }
}

function HardLevelPage () {
  const [grid, setGrid] = useState([]);
  const [lockGame, setLockGame] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [gameOver, setGameOver] = useState(false);
  const [countFlag, setCountFlag] = useState(numMines);


  useEffect(() => {
    generateGrid();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setLockGame(true);
      setShowDefeat(true);
    }
  }, [timeLeft])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0 || (gameOver && (showCongratulations === false))) {
          clearInterval(timer);
          return null;
        }
        return prevTime === 0 || gameOver ? prevTime : prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, showCongratulations]);

  function generateGrid() {
    setLockGame(false);
    setShowCongratulations(false);
    setShowDefeat(false);
    setTimeLeft(time);
    setGameOver(false);
    setCountFlag(numMines);
    const newGrid = initializeGrid();
    placeMines(newGrid);
    countNeighborMines(newGrid);
    setGrid(newGrid);
  }

  function handleCellClick(row, col) {
    if (lockGame || grid[row][col].isOpen) return;
    const newGrid = [...grid];
    let flaggedCellsOpened = 0;
    if (newGrid[row][col].hasMine) {
      setLockGame(true);
      newGrid.forEach(row => row.forEach(cell => cell.isOpen = true));
      newGrid.forEach(row => row.forEach(cell => {if (cell.hasMine) {cell.mineActive = true;}}))
      setGrid(newGrid);
      setGameOver(true);
      setShowDefeat(true);
    } else {
      revealEmpty(newGrid, row, col);
      newGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.isOpen && cell.hasFlag) {
            newGrid[rowIndex][colIndex].hasFlag = false;
            flaggedCellsOpened++;
          }
        })
      })
      // setCountFlag(prevCountFlag => prevCountFlag + flaggedCellsOpened);
      setCountFlag(prevCountFlag => Math.min(prevCountFlag + flaggedCellsOpened, numMines));
      
      setGrid(newGrid);
      const allNonMineCellsOpened = newGrid.every(row => row.every(cell => cell.hasMine || cell.isOpen));
      if (allNonMineCellsOpened) {
        setShowCongratulations(true);
        setGameOver(true);
      }
    }
  }

  function handleRightClick(row, col, e) {
    e.preventDefault();
    const newGrid = [...grid];
    if (lockGame || newGrid[row][col].isOpen) return;
    if (countFlag > 0 && !newGrid[row][col].isOpen) {if (!newGrid[row][col].hasFlag && !newGrid[row][col].hasQuestion) {
      newGrid[row][col].hasFlag = true;
      } else if (newGrid[row][col].hasFlag && !newGrid[row][col].hasQuestion) {
        newGrid[row][col].hasFlag = false;
        newGrid[row][col].hasQuestion = true;
      } else {
        newGrid[row][col].hasFlag = false;
        newGrid[row][col].hasQuestion = false;
      }
      if (newGrid[row][col].hasFlag) {
        setCountFlag(prevCountFlag => prevCountFlag - 1);
      } else if (!newGrid[row][col].hasFlag && newGrid[row][col].hasQuestion) {
        setCountFlag(prevCountFlag => prevCountFlag + 1);
      } else {
        setCountFlag(prevCountFlag => prevCountFlag);
      }
    } else {
      if (countFlag === 0 && newGrid[row][col].hasFlag) {
        setCountFlag(prevCountFlag => prevCountFlag + 1)
        newGrid[row][col].hasFlag = false;
        newGrid[row][col].hasQuestion = true;
      }
    }
    
    setGrid(newGrid);
  }

  return (
    <main className="hardLevelPageContainer">
      <div className="hardGridContainer">
        <table>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onContextMenu={(e) => handleRightClick(rowIndex, colIndex, e)}
                      className={`${cell.isOpen ? 'open' : ''} ${cell.hasMine ? 'mine' : ''} ${cell.mineActive ? 'active' : ''} ${cell.numberClass} ${cell.mineActive ? 'active' : ''} `}>
                        {cell.isOpen && cell.hasMine ? 'X' : cell.isOpen && !cell.hasMine && cell.neighborMines > 0 && cell.neighborMines}
                        {!cell.isOpen && cell.hasFlag ? 'F' : ""}
                        {!cell.isOpen && !cell.hasFlag && cell.hasQuestion ? '?' : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="optionsContainer">
        <div className="timerContainer">
          <h1>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</h1>
          <h1>Flags: {(countFlag).toString().padStart(2, "0")}</h1>
        </div>
        <div className="buttonContainer">
          <button className="backButton"><Link to="/settings">Back</Link></button>
          <button onClick={generateGrid}>Reset Game</button>
        </div>
      </div>
      <CongratulationsPopup show={showCongratulations} onClose={() => setShowCongratulations(false)}/>
      <DefeatPopup show={showDefeat} onClose={() => setShowDefeat(false)}/>
    </main>
  )
}

export default HardLevelPage;