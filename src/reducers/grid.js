import cloneDeep from 'lodash/cloneDeep'
import {solver} from '../utils/sudoku'

const initialState = [
	[8, 0, 0, 4, 0, 6, 0, 0, 7],
	[0, 0, 0, 0, 0, 0, 4, 0, 0],
	[0, 1, 0, 0, 0, 0, 6, 5, 0],
	[5, 0, 9, 0, 3, 0, 7, 8, 0],
	[0, 0, 0, 0, 7, 0, 0, 0, 0],
	[0, 4, 8, 0, 2, 0, 1, 0, 3],
	[0, 5, 2, 0, 0, 0, 0, 9, 0],
	[0, 0, 1, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 9, 0, 2, 0, 0, 5]
];

window.gridHistory = window.gridHistory || [initialState];

export default function grid(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            const {row, col, val} = action;
            let changeRow = [
                ...state[row].slice(0, col),
                val,
                ...state[row].slice(col + 1)
            ];
            let changeState = [
                ...state.slice(0, row),
                changeRow,
                ...state.slice(row + 1)
            ]
            window.gridHistory.push(changeState);
            return changeState;

        case 'SOLVE':
            let cloneState = cloneDeep(initialState);
            solver(cloneState);
            window.gridHistory = [cloneState];
            return cloneState;
        case 'UNDO':
            let lstState;
            if (window.gridHistory.length > 1) {
                window.gridHistory.splice(window.gridHistory.length - 1, 1);
                lstState = window.gridHistory[window.gridHistory.length - 1];
            } else {
                lstState = cloneDeep(initialState);
                window.gridHistory = [initialState];
            }
            return lstState;
        case 'CLEAR':
            let clrCloneState = cloneDeep(initialState);
            window.gridHistory = [clrCloneState];
            return clrCloneState;
        default:
            return state;
    }
}