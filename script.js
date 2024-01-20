// removeme4 @ts-check

import { randomInt, compareNumbers } from "./utils.js";

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

    createGrid();
    resetMines();
    createMines();
    printGrid(grid);

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

function createGrid() {
    grid = [];
    gridDom = [];
    exploreGrid = [];

    for (let x = 0; x < gridHeight; x++) {
        grid[x] = [];
        gridDom[x] = [];
        exploreGrid[x] = [];
        for (let y = 0; y < gridWidth; y++) {
            grid[x][y] = 0;
            gridDom[x][y] = createGridElement(x * gridWidth + y);
            exploreGrid[x][y] = false;
        }
    }
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
    cellElement.innerText = i;
    cellElement.setAttribute("data-num", i);
    gridElement.appendChild(cellElement);
    cellElement.addEventListener("click", onCellClick);
    return cellElement;
}

function printGrid(matrix) {
    for (let x = 0; x < matrix.length; x++) {
        let row = "";
        for (let y = 0; y < matrix[x].length; y++) {
            if (grid[x][y] >= 0)
                row += " " + grid[x][y] + " ";
            else
                row += grid[x][y] + " ";
        }
        console.log(row);
    }
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

function visit(x, y) {
    exploreGrid[x][y] = true;
    gridDom[x][y].classList.add("visited");
    gridDom[x][y].removeEventListener("click", onCellClick);
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
        cellElement.removeEventListener("click", onCellClick);
    }
}

startGame();
