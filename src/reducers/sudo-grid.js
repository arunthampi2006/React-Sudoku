import {extend, cloneDeep, isEmpty, includes} from 'lodash'
import {ddItems} from '../utils/randomsudoku'

window.gridHistory = cloneDeep(window.gridHistory || []);
window.initGrid = cloneDeep(window.initGrid || []);

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
            window.gridHistory.push(cloneDeep(changeState));
            return extend({}, state, {grid: changeState});

        case 'SOLVE':
            let solveState = state
            let solvedGrid = solveState.grid
            let cloneState = cloneDeep(window.initGrid);
            window.gridHistory = [cloneState];
            solveState.grid = cloneState;
            let solvedGrids = cloneDeep(solveState.solvedGrids)
            let slvObj = {}
            slvObj.solvedGrids = !includes(solvedGrids, solvedGrid) ? 
            [...solvedGrids, solvedGrid] : solvedGrids;

            return extend({}, state, cloneDeep(slvObj));
        case 'UNDO':
            let lstState = [];

            window.gridHistory.splice(window.gridHistory.length - 1, 1);
            
            if (!window.gridHistory.length) {
                lstState = cloneDeep(window.initGrid);
                window.gridHistory = [lstState];
            } else  {
                lstState = window.gridHistory[window.gridHistory.length - 1];
            }
            return extend({}, state, {grid: lstState});
        case 'CLEAR':
            let clrCloneState = cloneDeep(window.initGrid);
            window.gridHistory = [clrCloneState];
            return extend({}, state, {grid: clrCloneState});
        case 'DD_CHANGE':
            let {value} = action;
            let updateState = state;
            let sudNewState = cloneDeep(updateState.randomSudo[value]);

            window.gridHistory = [sudNewState];
            window.initGrid = sudNewState

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
            window.initGrid = cloneDeep(!upStIsEmty ? updatedRdmState['sudo9'] : []);

            let fetchObj = {}
            fetchObj.grid = window.initGrid
            fetchObj.randomSudo = updatedRdmState
            fetchObj.ddItems = cloneDeep(dropdownItems)
            window.gridHistory = [window.initGrid]
            return extend({}, state, cloneDeep(fetchObj));
        default:
            return state;
    }
}
