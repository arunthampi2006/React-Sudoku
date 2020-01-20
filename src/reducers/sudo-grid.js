import {extend, cloneDeep, isEmpty} from 'lodash'
import {solver} from '../utils/sudoku'
import {ddItems} from '../utils/randomsudoku'

let initialState;

window.gridHistory = window.gridHistory || [];

const sudo = {
    grid: [],
    randomSudo: {},
    initGrid: [],
    ddItems: []
}

export default function sudoGrid(state = sudo, action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            const {row, col, val} = action.value;
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
            let solveState = state
            let cloneState = cloneDeep(solveState.initGrid);
            window.gridHistory = [cloneState];
            solveState.grid = cloneState;
            // solver(cloneState, false, true)
            return extend({}, state, solveState);
        case 'UNDO':
            let lstState;
            let undoState = state;
            if (window.gridHistory.length > 1) {
                window.gridHistory.splice(window.gridHistory.length - 1, 1);
                lstState = window.gridHistory[window.gridHistory.length - 1];
            } else {
                lstState = cloneDeep(undoState.initGrid);
                window.gridHistory = [lstState];
            }
            undoState.grid = lstState;
            return extend({}, state, undoState);
        case 'CLEAR':
            let clrState = state;
            let clrCloneState = cloneDeep(clrState.initGrid);
            window.gridHistory = [clrCloneState];
            clrState.grid = clrCloneState;
            return extend({}, state, clrState);
        case 'DD_CHANGE':
            let {value} = action;
            let updateState = state;
            let sudNewState = cloneDeep(updateState.randomSudo[value]);

            window.gridHistory = [sudNewState];
            updateState.grid = sudNewState;
            updateState.initGrid = sudNewState
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
            initialState = cloneDeep(initialState)

            sudoState.initGrid = initialState
            sudoState.grid = initialState
            sudoState.randomSudo = updatedRdmState
            sudoState.ddItems = cloneDeep(dropdownItems)
            window.gridHistory = [initialState]
            return extend({}, state, sudoState);
        default:
            return state;
    }
}
