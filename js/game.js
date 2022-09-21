'use strict';
const WALL = '//';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '🍇';
const CHERRY = '🍒';

var gBoard;
var gCherryInterval;
var gGame = {
    score: 0,
    isOn: false,
    foodCount: 0,
    eatenCount: 0
}

function init() {
    restartGame();
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gCherryInterval = setInterval(addCherry, 15 * 1000);
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gGame.foodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gGame.foodCount--;
            }
        }
    }
    board[1][1] = SUPERFOOD;
    board[1][8] = SUPERFOOD;
    board[8][1] = SUPERFOOD;
    board[8][8] = SUPERFOOD;
    gGame.foodCount--;
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if (gGame.eatenCount === gGame.foodCount) {
        gameDone();
    }
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elHeader2 = document.querySelector('.modal h2');
    elHeader2.innerText = 'Game over';
}

function gameDone() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elHeader2 = document.querySelector('.modal h2');
    elHeader2.innerText = 'Victorious! 🏆';
}

function restartGame() {
    console.clear();
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    gGame.foodCount = 0;
    gGame.eatenCount = 0;
}

function addCherry() {
    var emptyCell = getEmptyCell();
    if (!emptyCell) return;
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
}

function getEmptyCell() {
    var emptyCells = getEmptyCells();
    if (emptyCells.length === 0 || !emptyCells) return;
    var randIdx = getRandomIntInt(0, emptyCells.length);
    var emptyCell = emptyCells[randIdx];
    return emptyCell;
}

function getEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }
    return emptyCells;
}