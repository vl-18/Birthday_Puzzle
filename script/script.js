document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'diljit_dosanjh.jpg',
        'confetti.jpg',
        'emoji_imggg.jpg',
        'friends_series.jpg',
        'funny_cat.jpg',
        'cat.jpg'

    ]; // Replace with your actual image URLs

    const startGameButton = document.getElementById('start-game-button');
    const nextPuzzleButton = document.getElementById('next-puzzle-button');
    const playAgainButton = document.getElementById('play-again-button');
    const usernameInput = document.getElementById('username');
    const usernameDisplay = document.getElementById('username-display');
    const userInputSection = document.getElementById('user-input-section');
    const puzzleSection = document.getElementById('puzzle-section');
    const messageSection = document.getElementById('message-section');
    const finalMessageSection = document.getElementById('final-message-section');
    const puzzleContainer = document.getElementById('puzzle-container');
    const piecesContainer = document.getElementById('pieces-container');
    const messageDisplay = document.getElementById('message');

    let currentPuzzleIndex = 0;
    let puzzles = [];
    let username = '';

    function initializeGame() {
        currentPuzzleIndex = 0;
        puzzles = shuffleArray(images).slice(0, 3);
        username = usernameInput.value;
        usernameDisplay.textContent = `Hello, ${username}!`;
        showSection(puzzleSection);
        startPuzzle();
    }

    function startPuzzle() {
        const imageUrl = puzzles[currentPuzzleIndex];
        puzzleContainer.innerHTML = '';
        piecesContainer.innerHTML = '';
        createPuzzle(imageUrl);
    }

    function createPuzzle(imageUrl) {
        const rows = 5;
        const cols = 5;
        const pieces = [];
        let draggedPiece = null;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.style.backgroundImage = `url(${imageUrl})`;
                piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
                piece.style.left = `${col * 100}px`;
                piece.style.top = `${row * 100}px`;
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.draggable = true;
                pieces.push(piece);
            }
        }

        shuffleArray(pieces).forEach(piece => {
            piecesContainer.appendChild(piece);
        });

        piecesContainer.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('piece')) {
                draggedPiece = e.target;
            }
        });

        piecesContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        piecesContainer.addEventListener('drop', (e) => {
            if (draggedPiece && e.target.classList.contains('piece')) {
                const targetPiece = e.target;
                swapPieces(draggedPiece, targetPiece);
                checkIfSolved();
            }
        });

        function swapPieces(piece1, piece2) {
            const tempRow = piece1.style.top;
            const tempCol = piece1.style.left;
            piece1.style.top = piece2.style.top;
            piece1.style.left = piece2.style.left;
            piece2.style.top = tempRow;
            piece2.style.left = tempCol;
        }
    }

    function checkIfSolved() {
        let solved = true;
        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);
            const pieceRow = parseInt(piece.style.top) / 100;
            const pieceCol = parseInt(piece.style.left) / 100;
            if (row !== pieceRow || col !== pieceCol) {
                solved = false;
            }
        });
        if (solved) {
            showMessage(`Puzzle ${currentPuzzleIndex + 1} completed!`);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showSection(section) {
        userInputSection.classList.add('hidden');
        puzzleSection.classList.add('hidden');
        messageSection.classList.add('hidden');
        finalMessageSection.classList.add('hidden');
        section.classList.remove('hidden');
    }

    function showMessage(message) {
        messageDisplay.textContent = message;
        showSection(messageSection);
    }

    startGameButton.addEventListener('click', () => {
        if (usernameInput.value.trim() !== '') {
            initializeGame();
        } else {
            alert('Please enter your name.');
        }
    });

    nextPuzzleButton.addEventListener('click', () => {
        currentPuzzleIndex++;
        if (currentPuzzleIndex < puzzles.length) {
            startPuzzle();
            showSection(puzzleSection);
        } else {
            showSection(finalMessageSection);
        }
    });

    playAgainButton.addEventListener('click', () => {
        showSection(userInputSection);
    });
});

