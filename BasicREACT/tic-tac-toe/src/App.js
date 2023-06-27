import { useState } from "react";

// followed this tutorial: https://react.dev/learn/tutorial-tic-tac-toe

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log("NEXT HISTORY: ", nextHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    console.log("CURRENT MOVE: ", currentMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = `Go to game start`;
    }

    // console.log("MOVE: ", move);

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// this is a child component
function Board({ isNext, squares, onPlay }) {
  // this state is declared in the parent component [lift up state -> Game]
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [isNext, setIsNext] = useState(true);

  // check winner
  const winner = CalculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${isNext ? "X" : "O"}`;
  }

  function handleClick(idx) {
    // check if the square is already filled or not
    // it'll restrict you from filling a square that is already filled
    if (squares[idx] || CalculateWinner(squares)) {
      return;
    }

    // making a copy of squares array
    const nextSquares = squares.slice();

    if (isNext) {
      nextSquares[idx] = "X";
    } else {
      nextSquares[idx] = "O";
    }

    onPlay(nextSquares);
  }

  /*
    Note:
    1. Initally onSquareClick={handleClick(0)} is meant to "Passing Down" a function instead of "Calling" it. But the problem is that, we have to call the function for each of the squares changing their state.
    Thats why we're writing Arrow function like {() => handleClick(0)}
    So that, when the  button is clicked, it will call the function handleClick(0) and then handleClick(1) and so on.
  */

  return (
    <>
      <div
        className="status"
        style={{
          color: status.includes("Winner") ? "red" : "black",
          fontSize: "20px",
          fontFamily: "cursive",
        }}
      >
        {status}
      </div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// this is a child component
function Square({ value, onSquareClick }) {
  // this state is declared in the child component [uplifting the state -> Board]
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   console.log(`clicked at ${value}`);
  // }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
