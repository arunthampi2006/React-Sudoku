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

window.gridHistory = window.gridHistory || [];

export default function grid(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            const {row, col, val} = action;
            let changeRow = [
                ...state[row].slice(0, col),
                val,
                ...state[row].slice(col + 1)
            ];
            window.gridHistory.push(state);
            return [
                ...state.slice(0, row),
                changeRow,
                ...state.slice(row + 1)
            ];

        case 'SOLVE':
            let cloneState = cloneDeep(initialState);
            solver(cloneState);
            window.gridHistory = [];
            return cloneState;
        case 'UNDO':
            let lstState = window.gridHistory.splice(window.gridHistory.length - 1, 1);
            return lstState;
        case 'CLEAR':
            window.gridHistory = [];
            return cloneDeep(initialState);
        default:
            return state;
    }
}