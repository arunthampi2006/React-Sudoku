export function inputValue (row, col, val) {
    return {
        type: 'INPUT_VALUE',
        row, col, val
    }
}

export function solve() {
    return {
        type: 'SOLVE'
    }
}
export function undo() {
    return {
        type: 'UNDO'
    }
}
export function clear() {
    return {
        type: 'CLEAR'
    }
}