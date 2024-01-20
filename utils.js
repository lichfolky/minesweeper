
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