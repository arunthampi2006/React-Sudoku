import cloneDeep from 'lodash/cloneDeep'
import {default as extend} from 'lodash/assign'

const initialState = {
    isSolved: false,
    isEdited: false,
    isTrgr: false
}

export default function status(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            return extend({}, state, {isEdited: true});
        case 'SOLVE':
            return extend({}, state, {isSolved: true, isEdited: true});
        case 'CLEAR':
        case 'DD_CHANGE':
            return extend({}, state, {isEdited: false, isSolved: false})
        case 'UNDO':
            if (!window.gridHistory.length > 1) {
                return extend({}, state, {isEdited:false});
            }
            return state;
        case 'FETCH_DATA':
            let {isReqTgr} = action;
            let isTgrChk = isReqTgr === 'init' ? true : false
            return extend({}, state, {isEdited: false, isTrgr: isTgrChk})
        default:
            return state;
    }
}