import {extend, cloneDeep, isEmpty} from 'lodash'
import {solver} from '../utils/sudoku'
import {ddItems} from '../utils/randomsudoku'

let initialState;

window.gridHistory = window.gridHistory || [];

const sudo = {
    grid: [],
    randomSudo: {},
    ddItems: []
}

export default function sudoGrid(state = sudo, action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            const {row, col, val} = action;
            let changeRow = [
                ...state.grid[row].slice(0, col),
                val,
                ...state.grid[row].slice(col + 1)
            ];
            let changeState = [
                ...state.grid.slice(0, row),
                changeRow,
                ...state.grid.slice(row + 1)
            ]
            window.gridHistory.push(changeState);
            return extend({}, state, {grid: changeState});

        case 'SOLVE':
            let cloneState = cloneDeep(initialState);
            solver(cloneState);
            window.gridHistory = [cloneState];
            let solveState = state
            solveState.grid = cloneState;
            return extend({}, state, solveState);
        case 'UNDO':
            let lstState;
            if (window.gridHistory.length > 1) {
                window.gridHistory.splice(window.gridHistory.length - 1, 1);
                lstState = window.gridHistory[window.gridHistory.length - 1];
            } else {
                lstState = cloneDeep(initialState);
                window.gridHistory = [lstState];
            }
            let undoState = state;
            undoState.grid = lstState;
            return extend({}, state, undoState);
        case 'CLEAR':
            let clrCloneState = cloneDeep(initialState);
            window.gridHistory = [clrCloneState];
            let clrState = state;
            clrState.grid = clrCloneState;
            return extend({}, state, clrState);
        case 'DD_CHANGE':
            let {value} = action;
            let updateState = state;
            let sudNewState = cloneDeep(updateState.randomSudo[value]);
            initialState = sudNewState
            window.gridHistory = [sudNewState];
            updateState.grid = sudNewState;
            return extend({}, state, updateState);
        case 'FETCH_DATA':
            let {data, isReqTgr} = action.value;
            let sudoState = state;
            let rdmState = sudoState.randomSudo;
            let rdmStateIsemty = isEmpty(rdmState);
            let updatedRdmState = isReqTgr === 'success' ? data : !rdmStateIsemty ? rdmState : {};
            updatedRdmState = cloneDeep(updatedRdmState)
            let upStIsEmty = isEmpty(updatedRdmState)
            let dropdownItems = !upStIsEmty ? ddItems(updatedRdmState) : [];
            initialState = !upStIsEmty ? updatedRdmState['sudo9'] : [];

            sudoState.grid = cloneDeep(initialState)
            sudoState.randomSudo = updatedRdmState
            sudoState.ddItems = cloneDeep(dropdownItems)
            window.gridHistory = [initialState]
            return extend({}, state, sudoState);
        default:
            return state;
    }
}
