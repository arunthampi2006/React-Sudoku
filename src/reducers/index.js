import {combineReducers} from 'redux'
import grid from './grid'
import status from './status'

const mergeReducers = combineReducers(
    grid, status
)

export default mergeReducers;