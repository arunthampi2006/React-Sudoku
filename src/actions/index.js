export function inputValue (value) {
    return {
        type: 'INPUT_VALUE',
        value
    }
}

export function solve(value) {
    return {
        type: 'SOLVE',
        value
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
export function ddChange(value) {
    return {
        type: 'DD_CHANGE',
        value
    }
}
export function fetchData(value) {
    return {
        type: 'FETCH_DATA',
        value
    }
}
export function getMessage(value) {
    return {
        type: 'MESSAGE',
        value
    }
}