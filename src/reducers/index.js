import {combineReducers} from 'redux'
import sudoGrid from './sudo-grid'
import status from './status'
const mergeReducers = combineReducers({
    sudoGrid, status
})

export default mergeReducers;