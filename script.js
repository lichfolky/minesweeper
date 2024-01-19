let bombs;
let numBombs = 5;
let gridHeight = 10;
let gridWidth = 10;
let numCells = gridHeight * gridWidth;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetBombs() {
    bombs = [];
    for (let i = 0; i < numBombs; i++) {
        let bomb;
        do {
            bomb = randomInt(0, numCells - 1);
        } while (bombs.includes(bomb));
        bombs.push(bomb);
    }
}

resetBombs();
console.log(bombs);