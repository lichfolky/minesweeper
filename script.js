// removeme4 @ts-check

import { createMatrix, printGrid, randomInt, compareNumbers, nRandomInt } from "./utils.js";

let numMines;
let gridHeight;
let gridWidth;
let numCells;

// State
let gameEnded = false;
let mines = [];
let minesDom = [];
let grid;
let gridDom;
let exploreGrid;
let score = 0;

// Elements
const gridElement = document.querySelector("div#grid");
const gameMessage = document.querySelector("div#message");

function startGame(argNumMines = 10, argGridHeight = 10, argGgridWidth = 10) {
    numMines = argNumMines;
    gridHeight = argGridHeight;
    gridWidth = argGgridWidth;
    numCells = gridHeight * gridWidth;

    grid = createMatrix(gridHeight, gridWidth);
    exploreGrid = createMatrix(gridHeight, gridWidth, false);
    gridDom = createGridDom();
    mines = nRandomInt(numMines, 0, numCells - 1);
    createMines();

    printGrid(grid);

    score = 0;
    gameMessage.innerText = "Minesweeper";
    gameEnded = false;
}

function createGridDom() {
    let gridDom = [];
    for (let x = 0; x < gridHeight; x++) {
        gridDom[x] = [];
        for (let y = 0; y < gridWidth; y++) {
            gridDom[x][y] = createGridElement(x * gridWidth + y);
        }
    }
    return gridDom;
}

/*
    NO N NE
    O  -  E
    SO S SE
*/
function createMines() {
    for (const mine of mines) {
        let x = Math.floor(mine / gridWidth);
        let y = mine % gridWidth;
        grid[x][y] = -1;
        minesDom.push(gridDom[x][y]);
        countMines(x, y);
    }
}

function countMines(x, y) {
    up(x - 1, y - 1);
    up(x - 1, y);
    up(x - 1, y + 1);

    up(x, y - 1);
    up(x, y + 1);

    up(x + 1, y - 1);
    up(x + 1, y);
    up(x + 1, y + 1);
}

function up(x, y) {
    if (x < gridWidth && y < gridHeight && x >= 0 && y >= 0) {
        if (grid[x][y] >= 0)
            grid[x][y]++;
    }
}

function createGridElement(i) {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-num", i);
    cellElement.addEventListener("click", onCellClick);
    cellElement.addEventListener("contextmenu", setFlag);
    gridElement.appendChild(cellElement);
    return cellElement;
}

function onCellClick(event) {
    let cellElement = event.target;
    let nCell = parseInt(cellElement.getAttribute('data-num'));
    let x = Math.floor(nCell / gridWidth);
    let y = nCell % gridWidth;

    if (grid[x][y] == -1) {
        detonate();
    } else {
        explore(x, y);
    }
}

function setFlag(event) {
    let cellElement = event.target;
    let nCell = parseInt(cellElement.getAttribute('data-num'));
    let x = Math.floor(nCell / gridWidth);
    let y = nCell % gridWidth;

    if (gridDom[x][y].classList.contains("flag")) {
        gridDom[x][y].classList.remove("flag");
        gridDom[x][y].addEventListener("click", onCellClick);
    } else {
        gridDom[x][y].classList.add("flag");
        gridDom[x][y].removeEventListener("click", onCellClick);
    }
    event.preventDefault();
}

function visit(x, y) {
    exploreGrid[x][y] = true;
    gridDom[x][y].classList.add("visited");
    gridDom[x][y].classList.remove("flag");
    removeEventListeners(gridDom[x][y]);
    if (grid[x][y] > 0) {
        gridDom[x][y].innerText = grid[x][y];
    } else {
        gridDom[x][y].innerText = "";
    }
    score++;
    if (score == numCells - numMines) {
        console.log(score, numCells - numMines);
        endGame(true);
    }
}

function removeEventListeners(element) {
    element.removeEventListener('contextmenu', setFlag);
    element.removeEventListener("click", onCellClick);
}

function explore(x, y) {
    if (x < gridWidth && y < gridHeight && x >= 0 && y >= 0) {
        if (!exploreGrid[x][y]) {
            if (grid[x][y] == 0) {
                visit(x, y);
                explore(x + 1, y);
                explore(x, y + 1);
                explore(x - 1, y);
                explore(x, y - 1);
            }
            if (grid[x][y] != 0) {
                visit(x, y);
            }
        }
    }
}

function detonate() {
    for (const mineElement of minesDom) {
        mineElement.classList.add("boom");
        mineElement.innerText = "X";
    }
    endGame(false);
}

function endGame(won) {
    if (won) {
        gameMessage.innerText = "You won 🥳";

    } else {
        gameMessage.innerText = "Game ended 😔 - score: " + score;
    }
    gameEnded = true;
    let cellElements = gridElement.querySelectorAll(".cell");
    for (const cellElement of cellElements) {
        removeEventListeners(cellElement);
    }
}

startGame();
