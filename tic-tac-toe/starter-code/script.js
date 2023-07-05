//General
let startView = document.getElementById("start-menu");
let gameView = document.getElementById("game");
let oBtn = document.getElementById("select-o");
let xBtn = document.getElementById("select-x");
let newGamePlayer = document.getElementById("game-vs-player");
let newGameCPU = document.getElementById("game-vs-cpu");

let board = document.getElementById("game-board");

let gameMode;
let turn = "x";
let player1 = "x";

//score = [x, ties, o]
let score = [0, 0, 0];
let turnDisplay = document.getElementById("turn");
let restartBtn = document.getElementById("restart");

//Result card elements
let quitBtn = document.getElementById("quit");
let nextRoundBtn = document.getElementById("next-round");
//Restart card elements
let restartCard = document.getElementById("restart-card")
let noRestartBtn = document.getElementById("no-restart");
let yesRestartBtn = document.getElementById("yes-restart");
let restartBtns = document.getElementById("restart-buttons");

class Game {
    constructor(gameMode) {
        this.gameMode = gameMode
    }
    addMove(symbol, row, col) {
        this.matrix[row][col] = symbol;
        document.getElementById(`${row}-${col}`).insertAdjacentElement("beforeend", createElement(symbol))
    }
    //Check if matrix is fully populated, if there is at least one null, return false
    checkTie() {
        let tieFlag = true;
        for (let i = 0; i < 3; i++) {
            this.matrix.forEach(row => {
                if (row.indexOf(null) !== -1) {
                    tieFlag = false;
                }
            })
        }
        return tieFlag;
    }
    //Check if a symbol has a strike
    checkForWin(symbol) {
        let winFlag = false;
        for (let i = 0; i < 3; i++) {
            if (this.matrix[0][i] === symbol && this.matrix[1][i] === symbol && this.matrix[2][i] === symbol) {
                winFlag = true;
            } else if (this.matrix[i][0] === symbol && this.matrix[i][1] === symbol && this.matrix[i][2] === symbol) {
                winFlag = true;
            }
        }
        if (this.matrix[0][0] === symbol && this.matrix[1][1] === symbol && this.matrix[2][2] === symbol) {
            winFlag = true;
        } else if (this.matrix[0][2] === symbol && this.matrix[1][1] === symbol && this.matrix[2][0] === symbol) {
            winFlag = true;
        }

        return [symbol, winFlag, this.checkTie()]
    }
    matrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    //check if competitor may have a strike
    //if there are two enemy symbols in the row, plece your symbol to prevent from scoring
    checkForCompetitorStrike(symbol, enemySymbol) {
        let moveMadeFlag = false;
        //traverse horizontally
        for (let i = 0; i < 3; i++) {
            let counterEnemy = 0;
            let counterMine = 0;
            let freeSlot = [null, null];
            for (let j = 0; j < 3; j++) {
                if (this.matrix[i][j] === enemySymbol) {
                    counterEnemy += 1;
                } else {
                    freeSlot = [i, j];
                }
                if (counterEnemy === 2 && freeSlot[0] !== null && this.matrix[freeSlot[0]][freeSlot[1]] === null) {
                    this.addMove(symbol, freeSlot[0], freeSlot[1]);
                    moveMadeFlag = true;
                }
            }
        }
        //traverse vertically
        for (let i = 0; i < 3; i++) {
            let counter = 0;
            let freeSlot = [null, null];
            for (let j = 0; j < 3; j++) {
                if (this.matrix[j][i] === enemySymbol) {
                    counter += 1;
                } else {
                    freeSlot = [j, i];
                }
                if (counter === 2 && freeSlot[0] !== null && this.matrix[freeSlot[0]][freeSlot[1]] === null) {
                    this.addMove(symbol, freeSlot[0], freeSlot[1]);
                    moveMadeFlag = true;
                }
            }
        }
        //traverse diagonally \
        let counter = 0;
        let freeSlot = [null, null];
        for (let i = 0; i < 3; i++) {
            if (this.matrix[i][i] === enemySymbol) {
                counter += 1;
            } else {
                freeSlot = [i, i];
            }
            if (counter === 2 && freeSlot[0] !== null && this.matrix[freeSlot[0]][freeSlot[1]] === null) {
                this.addMove(symbol, freeSlot[0], freeSlot[1]);
                moveMadeFlag = true;
            }
        }
        //traverse diagonally /
        counter = 0;
        freeSlot = [null, null];
        for (let i = 0; i < 3; i++) {
            let j;
            if (i === 0) {
                j = 2;
            } else if (i === 1) {
                j = 1;
            } else {
                j = 0;
            }
            if (this.matrix[i][j] === enemySymbol) {
                counter += 1;
            } else {
                freeSlot = [i, j];
            }
            if (counter === 2 && freeSlot[0] !== null && this.matrix[freeSlot[0]][freeSlot[1]] === null) {
                this.addMove(symbol, freeSlot[0], freeSlot[1]);
                moveMadeFlag = true;
            }
        }
        if (moveMadeFlag === false) {

        }

        turn = turn === "x" ? "o" : "x";
        whosTurn(turn)
        console.log(turn);

    }

    CPUNextMove(symbol, enemySymbol) {
        let potentialMoves = [];

        for (let i = 0; i < 3; i++) {
            let counter = 0;
            for (let j = 0; j < 3; j++) {
                if (this.matrix[i][j] === symbol) {
                    counter += 1;
                }
                if (counter > 0 && this.matrix[i][j] === null) {
                    this.addMove(symbol, freeSlot[0], freeSlot[1]);
                    moveMadeFlag = true;
                }
            }
        }
    }
}



////Selection board
// Toogle selection between cross and circle
oBtn.addEventListener("click", () => {
    oBtn.classList.add("selected");
    xBtn.classList.remove("selected");
    player1 = "o";
})

xBtn.addEventListener("click", () => {
    xBtn.classList.add("selected");
    oBtn.classList.remove("selected");
    player1 = "x";
})

newGamePlayer.addEventListener("click", () => { startGame("player") })
newGameCPU.addEventListener("click", () => { startGame("CPU") })

function startGame(mode) {
    gameMode = mode
    startView.classList.add("hidden");
    gameView.classList.remove("hidden");
    currentGame = new Game(gameMode);
}

//Game


whosTurn(turn);
//Initiate game

//Perform all operations on board when clicked
board.addEventListener("click", (e) => {
    //check if click element is a field (has attribute row)
    if (e.target.dataset.row !== undefined) {
        let row = e.target.dataset.row
        let col = e.target.dataset.col
        //If selected field is empty, add move in matrix, insert element, and turn to opposite symbol (from o->x and x->o) 
        if (currentGame.matrix[row][col] === null) {
            currentGame.addMove(turn, e.target.dataset.row, e.target.dataset.col);
            //e.target.insertAdjacentElement("beforeend", createElement(turn))
            if (currentGame.checkForWin(turn)[1] || currentGame.checkForWin(turn)[2]) {
                updateScore(currentGame.checkForWin(turn))
            };
            oppositeTurn = turn;
            turn = turn === "x" ? "o" : "x";

            whosTurn(turn)
            currentGame.checkForCompetitorStrike(turn, oppositeTurn);

        }
    }
})



//Function to create img element with symbol whose turn it is
function createElement(type) {
    let element = document.createElement("img");
    element.src = type === "x" ? "./assets/icon-x.svg" : "./assets/icon-o.svg"
    return element;
}

//// Showing results
let messageBg = document.getElementById("message-background")
let resultCard = document.getElementById("result-card");
let subMessage = document.getElementById("sub-message");
let resultMessage = document.getElementById("result-message");
let xScoreCount = document.getElementById("x-score-count");
let oScoreCount = document.getElementById("o-score-count");
let tiesScoreCount = document.getElementById("ties-score-count");


//Function to update score
function updateScore(resultArray) {
    //resultArray = [symbol, winFlag, tiesFlag]
    if (resultArray[1] === true) {
        if (resultArray[0] === "x") {
            score[0] = score[0] + 1
        } else {
            score[2] = score[2] + 1
        }
    } else if (resultArray[2] === true) {
        score[1] = score[1] + 1
    }
    xScoreCount.innerText = score[0];
    oScoreCount.innerText = score[2];
    tiesScoreCount.innerText = score[1];

    showResult(resultArray)
}

//Display result
function showResult(resultArray) {
    //if one of the players won
    if (resultArray[1] === true) {
        //if player x/o won, then fill out all elements for result card
        if (resultArray[0] === "x") {
            subMessage.innerText = "Player 1 has won!"
            //Remove symbol that remained from last round
            if (resultMessage.firstChild.tagName === "IMG") {
                resultMessage.firstChild.remove();
            }
            resultMessage.insertAdjacentElement("afterbegin", createElement("x"));
            resultMessage.style.color = "var(--blue2)"
        } else if (resultArray[0] === "o") {
            subMessage.innerText = "Player 2 has won!"
            //Remove symbol that remained from last round
            if (resultMessage.firstElementChild.tagName === "IMG") {
                resultMessage.firstElementChild.remove();
            }
            resultMessage.insertAdjacentElement("afterbegin", createElement("o"));
            resultMessage.style.color = "var(--yellow2)"
        }
        //if tied, fill out result card with appropriate info
    } else if (resultArray[2] === true) {
        subMessage.innerText = "Tie!"
        //Remove symbol that remained from last round
        if (resultMessage.firstElementChild.tagName === "IMG") {
            resultMessage.firstElementChild.remove();
        }
        resultMessage.insertAdjacentHTML("afterbegin", "<h1>NOBODY</h1>");
        resultMessage.style.color = "var(--grey)"
    }
    messageBg.classList.remove("hidden")
    resultCard.classList.remove("hidden")
}

//Display whos turn is 
function whosTurn(turn) {
    if (turnDisplay.firstChild.tagName === "IMG") {
        turnDisplay.firstChild.remove();
    }
    turnDisplay.insertAdjacentElement("afterbegin", createElement(turn));
}

////Next round, restart game etc.

//Next round


function nextRound() {
    currentGame = new Game(gameMode);
    messageBg.classList.add("hidden")
    resultCard.classList.add("hidden")
    resetBoard();
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        if (board.children[i].firstChild) {
            let child = board.children[i].firstChild
            board.children[i].removeChild(child);
        }
    }
}

nextRoundBtn.addEventListener("click", nextRound);


//Restart game

function restart(e) {
    messageBg.classList.remove("hidden");
    restartCard.classList.remove("hidden");
    restartBtns.addEventListener("click", (e) => {
        if (e.target === noRestartBtn) {
            messageBg.classList.add("hidden");
            restartCard.classList.add("hidden");
        } else if (e.target === yesRestartBtn) {
            messageBg.classList.add("hidden");
            restartCard.classList.add("hidden");
            restartScore();
            resetBoard();
        }
    })

}

function restartScore() {
    score = [0, 0, 0]
    xScoreCount.innerText = score[0];
    oScoreCount.innerText = score[2];
    tiesScoreCount.innerText = score[1];
}

restartBtn.addEventListener("click", restart)







