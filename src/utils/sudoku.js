import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import flatten from 'lodash/flatten';
import includes from 'lodash/includes';

const VALUE = range(1,10);
const DIM = range(0,9);
const ZERO = 0;

const getRow = (gird, rowPos) => {
    if ( !includes(DIM, rowPos) ) {
        throw new Error('Row not in the range');
    }
    return gird[rowPos];
}

const getCol = (gird, colPos) => {
    if ( !includes(DIM, colPos) ) {
        throw new Error('Column not in the range')
    }

    return gird.map(row => row[colPos]);
}

const getSquare = (grid, rowPos, colPos) => {
    if (!includes(DIM, rowPos) || !includes(DIM, colPos)) {
        throw new Error('Row or Column are not in the square range')
    }

    let rowStart = rowPos - (rowPos % 3);
    let colStart = colPos - (colPos % 3);
    let sqResult = [];

    for(let r = 0; r < 3; r++) {
        sqResult[r] = sqResult[r] || [];
        for (let c = 0; c < 3; c++ ) {
            sqResult[r].push(grid[rowStart + r][colStart + c]);
        }
    }

    return flatten(sqResult);
}

const getCheck = (grid, rowPos, colPos, number) => {
    if (!includes(DIM, rowPos) || !includes(DIM, colPos)) {
        throw new Error('Row or Column are not in the square range')
    }

    if (!includes(VALUE, number)) {
        throw new Error('Input number is not in the square range')
    }

    let row = getRow(grid, rowPos);
    let col = getCol(grid, colPos);
    let square = getSquare(grid, colPos);

    if (!includes(row, number) && !includes(col, number) && !includes(square, number)) {
        return true;
    }

    return false;
}

const getNext = (rowPos = 0, colPos = 0) => {
    return rowPos !== 8 ? [rowPos, colPos + 1] : colPos !== 8 ? [rowPos + 1, 0] : [0,0];
}

export const solver = (grid, rowPos = 0, colPos = 0) => {
    if ( includes(grid, rowPos) < 0 || includes(grid, colPos) < 0) {
        throw new Error( 'Row or Column are not in the range')
    }

    let isLast = rowPos >= 8 && colPos >= 8;

    if (grid[rowPos][colPos] !== ZERO && !isLast) {
        let [nextRowPos, nextColPos] = getNext(rowPos, colPos);
        return solver(grid, nextRowPos, nextColPos);
    }

    for (let i = 1; i <= 9; i++) {
        gird[rowPos][colPos] = i;
        let [nextRowPos, nextColPos] = getNext(rowPos, colPos);

        if (!nextRowPos && !nextColPos) {
            return true;
        }

        if (solver(grid, nextRowPos, nextColPos)) {
            return true;
        }
    }

    grid[rowPos][colPos] = ZERO;
    return false;
}

export const isSolvable = (grid) => {
    let solvableGrid = cloneDeep(grid);
    return solver(solvableGrid);
}

export const isComplete = grid => {
    let values = flatten(grid);
    let list = {};
    values.map(val => list[val] = list[val] ? list[val] : 1);
    delete list['0'];
    let total = Object.keys(list).reduce((total, key) => total + list[key], 0);

    return total === 81 ? true : false;
}

