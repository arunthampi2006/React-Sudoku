import {extend, cloneDeep, isEmpty, includes} from 'lodash'
import {ddItems} from '../utils/randomsudoku'

let initialState;

window.gridHistory = window.gridHistory || [];
window.initGrid = window.initGrid || [];
initialState = window.initGrid
const sudo = {
    grid: [],
    randomSudo: {},
    ddItems: [],
    solvedGrids: []
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
            let solvedGrid = solveState.grid
            let cloneState = cloneDeep(initialState);
            window.gridHistory = [cloneState];
            solveState.grid = cloneState;
            let solvedGrids = cloneDeep(solveState.solvedGrids)
            let slvObj = {}
            slvObj.solvedGrids = !includes(solvedGrids, solvedGrid) ? 
            [...solvedGrids, solvedGrid] : solvedGrids;

            return extend({}, state, cloneDeep(slvObj));
        case 'UNDO':
            let lstState;
            let undoInit = cloneDeep(initialState);
            if (window.gridHistory.length > 1) {
                window.gridHistory.splice(window.gridHistory.length - 1, 1);
                lstState = window.gridHistory[window.gridHistory.length - 1];
            } else {
                lstState = undoInit;
                window.gridHistory = [lstState];
            }
            return extend({}, state, {grid: lstState});
        case 'CLEAR':
            let clrCloneState = cloneDeep(initialState);
            window.gridHistory = [clrCloneState];
            return extend({}, state, {grid: clrCloneState});
        case 'DD_CHANGE':
            let {value} = action;
            let updateState = state;
            let sudNewState = cloneDeep(updateState.randomSudo[value]);

            window.gridHistory = [initialState];
            window.initGrid = sudNewState
            // updateState.grid = initialState;

            // let tstGrds = cloneDeep(updateState.solvedGrids)
            // if (!includes(tstGrds, sudNewState)) {
            //     updateState.solvedGrids = cloneDeep([...tstGrds, sudNewState]);
            // }

            return extend({}, state, cloneDeep({grid: sudNewState}));
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

            let fetchObj = {}
            fetchObj.grid = initialState
            fetchObj.randomSudo = updatedRdmState
            fetchObj.ddItems = cloneDeep(dropdownItems)
            window.gridHistory = [initialState]
            window.initGrid = initialState
            return extend({}, state, cloneDeep(fetchObj));
        default:
            return state;
    }
}
