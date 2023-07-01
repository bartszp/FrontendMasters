
// Toogle selection between cross and circle
let oBtn = document.getElementById("select-o");
let xBtn = document.getElementById("select-x");
let board = document.getElementById("game-board");

oBtn.addEventListener("click", () => {
    oBtn.classList.add("selected");
    xBtn.classList.remove("selected");
})

xBtn.addEventListener("click", () => {
    xBtn.classList.add("selected");
    oBtn.classList.remove("selected");
})

//Game
let gameMode = "cpu";
let turn = "x";
//score = [x, ties, o]
let score = [0, 0, 0];

class Game {
    constructor(gameMode) {
        this.gameMode = gameMode
    }
    addMove(symbol, row, col) {
        this.matrix[row][col] = symbol;
        console.log(this.matrix)
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
}

let currentGame = new Game(gameMode);

board.addEventListener("click", (e) => {
    //check if click element is a field (has attribute row)
    if (e.target.dataset.row !== undefined) {
        let row = e.target.dataset.row
        let col = e.target.dataset.col
        //If selected field is empty, add move in matrix, insert element, and turn to opposite symbol (from o->x and x->o) 
        if (currentGame.matrix[row][col] === null) {
            currentGame.addMove(turn, e.target.dataset.row, e.target.dataset.col);
            e.target.insertAdjacentElement("beforeend", createElement(turn))
            if (currentGame.checkForWin(turn)[1] || currentGame.checkForWin(turn)[2]) {
                updateScore(currentGame.checkForWin(turn))
            };
            turn = turn === "x" ? "o" : "x";
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
        resultMessage.insertAdjacentHTML("afterbegin", "<h1>NOBODY<H1>");
        resultMessage.style.color = "var(--grey)"
    }
    messageBg.classList.remove("hidden")
    resultCard.classList.remove("hidden")
}



//Next round
let quitBtn = document.getElementById("quit");
let nextRoundBtn = document.getElementById("next-round");

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








