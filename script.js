// removeme4 @ts-check

let numMines;
let gridHeight;
let gridWidth;
let numCells;

// State
let gameEnded = false;
let mines = [];
let score = 0;

// Elements
const gridElement = document.querySelector("div#grid");
const gameMessage = document.querySelector("div#message");

function startGame(argNumMines = 15, argGridHeight = 10, argGgridWidth = 10) {
    numMines = argNumMines;
    gridHeight = argGridHeight;
    gridWidth = argGgridWidth;
    numCells = gridHeight * gridWidth;

    resetMines();
    generateGrid();

    score = 0;
    gameMessage.innerText = "Minesweeper";
    gameEnded = false;
}

function resetMines() {
    mines = [];
    for (let i = 0; i < numMines; i++) {
        let mineIndex;
        do {
            mineIndex = randomInt(0, numCells - 1);
        } while (mines.includes(mineIndex));
        mines.push(mineIndex);
    }
    console.log(mines.sort(compareNumbers));

}

function generateGrid() {
    for (let i = 0; i < numCells; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.innerText = i;
        cellElement.setAttribute("data-num", i);
        gridElement.appendChild(cellElement);
        cellElement.addEventListener("click", onCellClick);
    }
}

function onCellClick(event) {
    let cellElement = event.target;
    let nCell = parseInt(cellElement.getAttribute('data-num'));
    console.log(nCell);
    if (isBomb(nCell)) {
        cellElement.classList.add("boom");
        quitGame(false);
    } else {
        score++;
        cellElement.classList.add("safe");
        cellElement.removeEventListener("click", onCellClick);
        console.log("Score: ", score, numCells - numMines);
        if (score == numCells - numMines) {
            quitGame(true);
        }
    }
}

function quitGame(won) {
    if (won) {
        gameMessage.innerText = "You won 🥳";

    } else {
        gameMessage.innerText = "Game ended 😔 - score: " + score;
    }

    gameEnded = true;

    let cellElements = gridElement.querySelectorAll(".cell");
    for (const cellElement of cellElements) {
        cellElement.removeEventListener("click", onCellClick);
    }
}

function isBomb(cellNum) {
    return mines.includes(cellNum);
}

function compareNumbers(a, b) {
    return a - b;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


startGame();

let str = "";
for (let i = 0; i < numCells; i++) {
    if (!mines.includes(i))
        str += i + ", ";
}
console.log(str);