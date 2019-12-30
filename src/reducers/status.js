import cloneDeep from 'lodash/cloneDeep'
import {default as extend} from 'lodash/assign'

const initialState = {
    isSolved: false,
    isEdited: false
}

export default function status(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'INPUT_VALUE':
            return extend({}, state, {isEdited: true});
        case 'SOLVE':
            return extend({}, state, {isSolved: true, isEdited: true});
        case 'CLEAR':
            return extend({}, state, {isEdited: false, isSolved: false})
        case 'UNDO':
            if (!window.gridHistory.length) {
                return extend({}, state, {isEdited:false});
            }
            return state;
        default:
            return state;
    }
}