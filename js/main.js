let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        document.querySelector(`.cell:nth-child(${index + 1})`).textContent = currentPlayer;
        
        if (checkWinner()) {
            document.getElementById('message').textContent = `Jogador ${currentPlayer} venceu!`;
            gameOver = true;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('message').textContent = 'Empate!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('message').textContent = '';
}

resetGame();
