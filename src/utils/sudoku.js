import { cloneDeep, range, flatten, includes, reduce } from "lodash";
import {getMessage} from '../actions';

const VALUE = range(1,10);
const DIM = range(0,9);
const ZERO = 0;
let rowStart = 0;
let sqrRow = [];
let sqrCol=[];
let TOTAL = 45;
let updatedRows = [];
let msg = {};
let cRow = []
let cCol = []
let cSquare = []

const getRow = (gird, rowPos) => {
    return gird[rowPos];
}

const getCol = (gird, colPos) => {

    return gird.map(row => row[colPos]);
}

const numberPosCheck = n=> n%3 === 1 ? true : false;

const getSquare = (grid, rowPos, colPos, n) => {
    let rPos = (n-n%3);
    let cn = n%3
    cn = sqrCol.length ? sqrCol[2] : cn
    let cPos = (cn+1);
    cPos = includes(sqrCol, 8) ? 0 : cPos
    rowStart = numberPosCheck(n) ? rPos : rowStart;
    let nRow = range(rowStart, rowStart+3);
    let nCol = !includes(nRow, cPos) ? _.range(cPos, cPos+3) : nRow;
    let rowStartPos = nRow;
    let colStartPos = nCol
    sqrRow = nRow
    sqrCol = nCol

    let sqResult = [];

    for(let r = 0; r < 3; r++) {
        sqResult[r] = sqResult[rowStartPos[r]] || [];
        for (let c = 0; c < 3; c++ ) {
            sqResult[r].push(grid[rowStartPos[r]][colStartPos[c]]);
        }
    }

    return flatten(sqResult);
}
const listTotal = (prev, nxt) => prev + nxt

const getCheck = (grid, rowPos, colPos, number) => {

    let row = getRow(grid, (number - 1));
    let col = getCol(grid, (number - 1));
    let square = getSquare(grid, rowPos, colPos, number);


    if (!includes(row, 0) && !includes(col, 0) && !includes(square, 0)) {
        let rTotal = reduce(row, listTotal);
        let cTotal = reduce(row, listTotal);
        let sqTotal = reduce(square, listTotal);

        let msgRow = msg.row || [];
        let msgCol = msg.col || [];
        let msgSquare = msg.square || [];

        if (rTotal !== TOTAL) {
            msgRow.push(number)
        }
        if (cTotal !== TOTAL) {
            msgCol.push(number)
        }

        if (sqTotal !== TOTAL) {
            msgSquare.push(number)
        } 

        if (msgRow.length || msgSquare.length) {
            msg.row = msgRow
            msg.col = msgCol
            msg.square = msgSquare
            return false;
        } else {
            cRow.push(rTotal)
            cCol.push(cTotal)
            cSquare.push(sqTotal)
            return true;
        }
        
    } else {
        return false;
    }
    
}

const getNext = (rowPos = 0, colPos = 0) => {
    if (!updatedRows.length) {
        updatedRows.push(0)
        return [rowPos, colPos]
    }
    if (colPos >= 0 && colPos <= 8) {
        if (colPos === 8) {
            updatedRows.push(rowPos+1);
            return [rowPos+1, 0]
        } else {
            return [rowPos, colPos+1]
        }
    }

}

export const solver = (grid, store, rowPos = 0, colPos = 0) => {

    let isLast = rowPos >= 8 && colPos >= 8;

    if (grid[rowPos][colPos] !== ZERO && !isLast) {
        let [nextRowPos, nextColPos] = getNext(rowPos, colPos);
        return solver(grid, store, nextRowPos, nextColPos);
    }
    let Grid = grid;
    let solve = [];
    cRow = []
    cCol = []
    cSquare = []
    for (let i = 1; i <= 9; i++) {
        solve.push(getCheck(Grid, rowPos, colPos, i));
    }

    if (includes(solve, false)) {
        let msgRow = msg.row && msg.row.length ? 
        'Row: "'+ msg.row.join() + '"are not in the grid range' :
        'Rows are not in the grid range'
        let msgCol = msg.col && msg.col.length ? 
        'Column: "'+ msg.col.join() + '"are not in the grid range' :
        'Columns are not in the grid range'
        let msgSquare = msg.col && msg.col.length ? 
        'Square: "' + msg.square.join() + '" are not in the square range' :
        'Squares are not in the square range';
        msg.row = msgRow
        msg.col = msgCol
        msg.square = msgSquare
        msg.validate = false
        store && store.dispatch(getMessage(msg));
        msg={};
        return false;
    } else {
        msg.validate = true
        store && store.dispatch(getMessage(msg));
        msg={};
        return true
}
    }
    

export const isSolvable = (grid, store) => {
    let solvableGrid = cloneDeep(grid);
    return solver(solvableGrid, store);
}

export const isComplete = grid => {
    let values = flatten(grid);
    let completArr = [...cRow, ...cCol, ...cSquare];
    let rwCol = 9
    let totalRwCol = rwCol*rwCol
    let total = 45
    let totalLength = 27
    let completeTotal = totalLength*total;
    let gridTotal = reduce(cRow, listTotal)
    let cArrChk = completArr.length === totalLength && completeTotal === reduce(completArr, listTotal)
    let girdChk = values.length === totalRwCol && !includes(values, 0) && gridTotal === reduce(values, listTotal)
    let completeChk = cArrChk && girdChk
    if (completeChk) {
        cRow = []
        cCol = []
        cSquare = []
    }

    return completeChk ? true : false;
}

