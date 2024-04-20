let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


function handleMove(cell) {
    const cellIndex = parseInt(cell.id);

    if (gameBoard[cellIndex] === '' && gameActive) {
            // Update game board
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

            // Check for winner
        if (checkWinner(currentPlayer)) {
            announceWinner(currentPlayer);
            gameActive = false;
            // Check for draw
        } else if (checkDraw()) {
            announceDraw();
            gameActive = false;
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for winner
function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === player;
        });
    });
}

// Function to check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Function to announce winner
function announceWinner(player) {
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.textContent = `${player} wins!`;
    winnerMessage.style.display = 'block';
}

// Function to announce draw
function announceDraw() {
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.textContent = 'It\'s a draw!';
    winnerMessage.style.display = 'block';
}



// Function to handle restart button click
function restartGame() {
    // Reset game state variables
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Clear the gameboard
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.textContent = '';
    });

    // Hide the winner message
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.style.display = 'none';

    // Update player text
    document.getElementById('playerText').textContent = 'Tic Tac Toe!';
}
// Restart button
document.getElementById('restartBtn').addEventListener('click', restartGame);
