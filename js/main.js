        const board = document.getElementById('board');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('reset');

        let currentPlayer = 'X';
        let boardState = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (const combo of winningCombinations) {
                const [a, b, c] = combo;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    gameActive = false;
                    return boardState[a];
                }
            }

            if (!boardState.includes('')) {
                gameActive = false;
                return 'Empate';
            }

            return null;
        }

        function handleClick(index) {
            if (!gameActive || boardState[index] !== '') return;

            boardState[index] = currentPlayer;
            board.children[index].textContent = currentPlayer;
            board.children[index].classList.add('cell-filled');

            const winner = checkWinner();
            if (winner) {
                if (winner === 'Empate') {
                    status.textContent = 'Empate!';
                } else {
                    status.textContent = `Jogador ${winner} venceu!`;
                }
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Vez do Jogador ${currentPlayer}`;
            }
        }

        function resetGame() {
            boardState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            status.textContent = 'Vez do Jogador X';
            board.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => handleClick(i));
                board.appendChild(cell);
            }
        }

        resetButton.addEventListener('click', resetGame);
        resetGame();