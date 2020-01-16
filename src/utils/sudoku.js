import { cloneDeep, range, flatten, includes } from "lodash";

const VALUE = range(1,10);
const DIM = range(0,9);
const ZERO = 0;

const getRow = (gird, rowPos) => {
    if ( !includes(DIM, rowPos) ) {
        console.log('Get Row: Row not in the range');
        throw new Error('Get Row: Row not in the range');
        // return false;
    }
    return gird[rowPos];
}

const getCol = (gird, colPos) => {
    if ( !includes(DIM, colPos) ) {
        console.log('Get Col: Column not in the range');
        throw new Error('Get Col: Column not in the range')
        // return false;
    }

    return gird.map(row => row[colPos]);
}

const getSquare = (grid, rowPos, colPos) => {
    if (!includes(DIM, rowPos) || !includes(DIM, colPos)) {
        console.log('Get Square: Row or Column are not in the square range');
        // alert('Row or Column are not in the square range')
        // return false
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
        console.log('Get check: Row or Column are not in the square range');
        throw new Error('Get check: Row or Column are not in the square range')
        // return false;
    }

    if (!includes(VALUE, number)) {
        console.log('Get check: Input number is not in the square range');
        throw new Error('Input number is not in the square range')
        // return false;
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
    colPos = colPos + 1;
    let rowPosChk = colPos % 8;
    return rowPosChk >= 1 && rowPosChk <= 8 ? [rowPos, colPos] : rowPosChk === 0 ? [rowPos + 1, colPos] : [0,0];
}

export const solver = (grid, rowPos = 0, colPos = 0) => {
    if (includes(grid, rowPos) < 0 || includes(grid, colPos) < 0) {
        console.log('Solver: Row or Column are not in the range');
        throw new Error( 'Row or Column are not in the range')
        // return false;
    }

    let isLast = rowPos >= 8 && colPos >= 8;

    if (grid[rowPos][colPos] !== ZERO && !isLast) {
        let [nextRowPos, nextColPos] = getNext(rowPos, colPos);
        return solver(grid, nextRowPos, nextColPos);
    }
    let Grid = grid;
    for (let i = 1; i <= 9; i++) {
        if (getCheck(Grid, i, rowPos, colPos)) {
            Grid[rowPos][colPos] = i;
            let [nRowPos, nColPos] = getNext(rowPos, colPos);

            if (!nRowPos && !nColPos) {
                return true;
            }

            if (solver(Grid, nRowPos, nColPos)) {
                return true;
            }
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

