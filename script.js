const board = document.getElementById("board");
const message = document.getElementById("message");
const cells = [];
let currentPlayer = "X";
let gameActive = true;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cells.push(cell);
    board.appendChild(cell);

    cell.addEventListener("click", () => cellClick(i));
}

function cellClick(index) {
    if (!gameActive || cells[index].textContent !== "") return;

    cells[index].textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (isBoardFull()) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner(player) {
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

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player;
    });
}

function isBoardFull() {
    return cells.every(cell => cell.textContent !== "");
}