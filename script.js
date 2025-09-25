const chessboard = document.getElementById('chessboard');
const board = [];
let selectedPiece = null;
let currentPlayer = 'white';

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const pieceSymbols = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙',
};

function createBoard() {
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = i;
            square.dataset.col = j;
            chessboard.appendChild(square);
            board[i][j] = square;
        }
    }
}

function renderPieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = initialBoard[i][j];
            if (piece) {
                const pieceElement = document.createElement('span');
                pieceElement.classList.add('piece');
                pieceElement.innerText = pieceSymbols[piece];
                pieceElement.dataset.piece = piece;
                board[i][j].appendChild(pieceElement);
            }
        }
    }
}

function isWhitePiece(piece) {
    return piece === piece.toUpperCase();
}

function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
    const pieceType = piece.toLowerCase();
    const dy = toRow - fromRow;
    const dx = toCol - fromCol;

    if (fromRow === toRow && fromCol === toCol) return false;

    switch (pieceType) {
        case 'p':
            const direction = isWhitePiece(piece) ? -1 : 1;
            const startRow = isWhitePiece(piece) ? 6 : 1;
            // Standard one-square move
            if (dx === 0 && dy === direction && !initialBoard[toRow][toCol]) {
                return true;
            }
            // Two-square move from start
            if (fromRow === startRow && dx === 0 && dy === 2 * direction && !initialBoard[toRow][toCol] && !initialBoard[fromRow + direction][fromCol]) {
                return true;
            }
            // Capture
            if (Math.abs(dx) === 1 && dy === direction && initialBoard[toRow][toCol]) {
                return true;
            }
            return false;
        case 'r':
            return dx === 0 || dy === 0;
        case 'n':
            return (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
        case 'b':
            return Math.abs(dx) === Math.abs(dy);
        case 'q':
            return Math.abs(dx) === Math.abs(dy) || dx === 0 || dy === 0;
        case 'k':
            return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
    }
    return false;
}

function handleSquareClick(event) {
    const square = event.target.closest('.square');
    if (!square) return;

    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    if (selectedPiece) {
        const fromRow = parseInt(selectedPiece.parentElement.dataset.row);
        const fromCol = parseInt(selectedPiece.parentElement.dataset.col);
        const piece = selectedPiece.dataset.piece;

        if (isValidMove(piece, fromRow, fromCol, row, col)) {
            const targetPiece = square.querySelector('.piece');
            if (targetPiece) {
                square.removeChild(targetPiece);
            }
            square.appendChild(selectedPiece);

            initialBoard[row][col] = initialBoard[fromRow][fromCol];
            initialBoard[fromRow][fromCol] = '';

            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        }
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
    } else {
        const pieceElement = square.querySelector('.piece');
        if (pieceElement) {
            const piece = pieceElement.dataset.piece;
            if ((currentPlayer === 'white' && isWhitePiece(piece)) || (currentPlayer === 'black' && !isWhitePiece(piece))) {
                selectedPiece = pieceElement;
                selectedPiece.classList.add('selected');
            }
        }
    }
}

createBoard();
renderPieces();
chessboard.addEventListener('click', handleSquareClick);
