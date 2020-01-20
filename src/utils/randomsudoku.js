import axios from 'axios'
import path from 'path'
import {map, cloneDeep, flatten} from 'lodash'
import {fetchData} from '../actions'
const prodPath = 'sudoku-host/'
export const randomSudoku = store => async => {
    let pathURL = path.join(__dirname, './sudo.json');
    axios.get(pathURL).then(res => {
        let sudoData = cloneDeep(res.data)
        store.dispatch(fetchData({
            isReqTgr: 'success',
            data: sudoData
        }))
    }).catch(err => console.log('Error: ', err));
}

export const ddItems = (data) => {
    let keys = Object.keys(data);
    return map(keys, (item, i) => {
        let zeroLnt = {zero: 0};
        let sudoItem = data[item];
        let sudoFlatten = flatten(sudoItem);
        sudoFlatten.reduce((p, n) => {
            zeroLnt.zero = (p === 0 || n === 0 ? zeroLnt.zero + 1 : zeroLnt.zero)
            return zeroLnt;
        }, {})
        let z = zeroLnt.zero;
        let lvl = z <= 50 ? 'Easy' : z > 50 && z <= 70 ? 'Medium' : 'Hard';
        let obj = {};
        obj.label = 'Sudoku (' + lvl +')';
        obj.value = item;
        obj.level = lvl.toLocaleLowerCase();
        return obj;
    });
}