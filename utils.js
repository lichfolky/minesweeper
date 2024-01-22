
export function compareNumbers(a, b) {
    return a - b;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function findMissingNumbers(array) {
    let missingNumbers = [];
    for (let i = 0; i < numCells; i++) {
        if (!array.includes(i))
            missingNumbers.push(i);
    }
    return missingNumbers;
}

export function nRandomInt(length, min, max) {
    const nRandom = [];
    for (let i = 0; i < length; i++) {
        let rngNum;
        do {
            rngNum = randomInt(min, max);
        } while (nRandom.includes(rngNum));
        nRandom.push(rngNum);
    }
    return nRandom;
}

export function printGrid(matrix) {
    let tableStr = "";
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] >= 0)
                tableStr += " " + matrix[x][y] + " ";
            else
                tableStr += ' ' + 'X' + " ";
        }
        tableStr += '\n';
    }
    console.log(tableStr);
}

export function createMatrix(rows, columns, fillVal = 0) {
    return Array(rows).fill().map(() => Array(columns).fill(fillVal));
}

// DEBUG

/*
export function printGrid(matrix) {
    let tableStr = "";
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] >= 0)
                tableStr += " " + matrix[x][y] + " ";
            else
                tableStr += '%c ' + 'X' + "%c ";
        }
        tableStr += '\n';
    }
    let minesCol = ['color: red', 'color: white'];
    let consoleOpt = [];
    for (const mine of mines) {
        consoleOpt.push(...minesCol);
    }
    console.log(tableStr, ...consoleOpt);
}
*/