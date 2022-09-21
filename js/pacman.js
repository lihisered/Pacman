'use strict';
const PACMAN = '🦍';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev);

    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    if (nextCell === WALL) return;
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return;
        else {
            gGame.eatenCount++;
            updateScore(1);
            gPacman.isSuper = true;
            setTimeout(function() {
                gPacman.isSuper = false;
            }, 5000);
        }
    } else if (nextCell === FOOD) {
        gGame.eatenCount++;
        updateScore(1);
    } else if (nextCell === CHERRY) {
        updateScore(10);
    } else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                if (nextLocation.i === gGhosts[i].location.i &&
                    nextLocation.j === gGhosts[i].location.j) {
                    if (gGhosts[i].currCellContent === FOOD) {
                        gGame.eatenCount++;
                        updateScore(1);
                        gGhosts[i].currCellContent = EMPTY;
                    }
                    var eatenGhost = gGhosts.splice(i, 1)[0];
                    setTimeout(function() {
                        gGhosts.push(eatenGhost);
                    }, 5000);
                }
            }
        } else {
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
            renderCell(gPacman.location, EMPTY);
            gameOver();
            return;
        }
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the dom
    renderCell(gPacman.location, getPacmanHTML());
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.rotate = 'rotate-up';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.rotate = 'rotate-down';
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.rotate = 'rotate-left';
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.rotate = 'rotate-right';
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmanHTML() {
    return `<span class="pacman ${gPacman.rotate}">${PACMAN}</span>`;
}