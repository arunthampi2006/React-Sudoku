import {extend, cloneDeep, includes} from 'lodash'

const initialState = {
    isSolved: false,
    isEdited: false,
    isTrgr: false,
    message: {},
    validate: false,
    isValidTgr: true
}
const getValue = action => {
    let {value} = action;
    return value
}

export default function status(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            let {isValidTgr} = action.value
            return extend({}, state, {isEdited: true, message: {}, validate: false, isValidTgr});
        case 'SOLVE':
            return extend({}, state, {isSolved: true, isEdited: true, message: getValue(action), validate: false});
        case 'CLEAR':
        case 'DD_CHANGE':
            return extend({}, state, {isEdited: false, isSolved: false, message: {}, validate: false, isValidTgr: true})
        case 'UNDO':
            let undoObj = {}
            undoObj.validate = false
            undoObj.message = {}
            let gridLngth = window.gridHistory.length
            undoObj.isEdited = gridLngth > 1 ? true : false
            undoObj.isValidTgr = gridLngth > 1 ? includes(window.gridHistory[gridLngth - 1][0], 0) : true
            return extend({}, state, undoObj);
        case 'FETCH_DATA':
            let {isReqTgr} = action;
            let isTgrChk = isReqTgr === 'init' ? true : false
            return extend({}, state, {isEdited: false, isTrgr: isTgrChk})
        case 'MESSAGE':
            let {value} = action;
            let {validate} = value;
            delete value.validate;
            return extend({}, state, {isEdited: false, message: value, validate })
        default:
            return state;
    }
}