const chessboard = document.getElementById('chessboard');
const board = [];
let selectedPiece = null;

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

function handleSquareClick(event) {
    const square = event.target.closest('.square');
    if (!square) return;

    const row = square.dataset.row;
    const col = square.dataset.col;

    if (selectedPiece) {
        const targetPiece = square.querySelector('.piece');
        if (targetPiece) {
            square.removeChild(targetPiece);
        }
        square.appendChild(selectedPiece);
        selectedPiece = null;
    } else if (square.querySelector('.piece')) {
        selectedPiece = square.querySelector('.piece');
    }
}

createBoard();
renderPieces();
chessboard.addEventListener('click', handleSquareClick);
