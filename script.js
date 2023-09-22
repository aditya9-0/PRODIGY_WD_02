// script.js
const cells = document.querySelectorAll("[data-cell]");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
});

restartButton.addEventListener("click", restart);

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        gameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameBoard.every((cell) => cell !== "")) {
        gameActive = false;
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return winPatterns.some((pattern) =>
        pattern.every((index) => gameBoard[index] === player)
    );
}

function restart() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    status.textContent = "Player X's turn";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

restart();
