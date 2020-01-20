import React, { Component } from 'react';
import Grid from './components/Grid';
import {isSolvable, isComplete, solver} from './utils/sudoku';
import { solve, undo, clear, ddChange} from './actions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import {randomSudoku} from './utils/randomsudoku'
import {isEmpty, map, isString} from 'lodash'

class APP extends Component {
    
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => { this.forceUpdate() })
    }
    
    componentWillMount() {
        const {store} = this.props
        randomSudoku(store).call()
        this.setState({
            sudoSelected: {
                label: 'Sudoku (Medium)',
                value: 'sudo9'
            }
        })
        this.unsubscribe && this.unsubscribe();
    }
    selectChange(sudoSelected) {
        const {store} = this.props;
        let value = sudoSelected.value;
        this.setState({sudoSelected})
        store.dispatch(ddChange(value))
    }
    validateTrigger() {
        const {store} = this.props;
        const {sudoGrid} = store.getState();
        const {grid} = sudoGrid;
        if (isSolvable(grid, store)) {
            return alert('This Sudoku is solvable, keep try to solve...')
        } else {
            return alert('This Sudoku is not solvable')
        }
    }

    solveTrigger() {
        const {store} = this.props;
        const {sudoGrid} = store.getState();
        const {grid, initGrid} = sudoGrid;
        if (isComplete(grid)){
            let msg = 'Congratulation, you solved it'
            store.dispatch(solve(msg))
            solver(initGrid, store)
        }
    }
    render() {
        const {store} = this.props;
        const {sudoGrid, status} = store.getState();
        const {grid, ddItems} = sudoGrid;
        const {isSolved, isEdited, isTrgr, message, validate, isValidTgr} = status;
        const {sudoSelected} = this.state;
        if (isTrgr) {
            return false;
        }
        const MessageElem = props => {
            return (
                <p>
                    {props.idx ? props.idx + ':' : ''} {props.msg}
                </p>
            )
        }
        const Message = (props) => {
            if (!props.msgChk) {
                let _isObject = isEmpty(props.msg)
                let _isString = isString(props.msg)
                let items = _isString ? props.msg : !_isObject ? Object.keys(props.msg) : 0
                return (<div> 
                    {!isSolved && items.length ? <h5>Error Messages</h5> : ''}
                    {
                        _isString ? <h5 className="solve-msg"><MessageElem msg={items}/></h5> : 
                        !_isObject ? map(items, (itm, i) => <MessageElem idx={i+1} msg={props.msg[itm]}/>) :
                        ''
                    }
                    </div>)
            } else {
                return false;
            }
        }
        return (
            <div>
                <Dropdown 
                    options={ddItems}
                    placeholder="Select a Sudoku" 
                    className='sudo-dd'
                    onChange={this.selectChange.bind(this)}
                    value={sudoSelected}
                ></Dropdown>
                <Grid grid={grid} status={status} {...this.props}/>

                <Message msgCk={isEmpty(message)} msg={message}/>

                <button
                    className='undo'
                    disabled={window.gridHistory && window.gridHistory.length < 2}
                    onClick={() => store.dispatch(undo())}
                >
                    ⤺ Undo
                </button>

                <button
                    className='clear'
                    disabled={!isEdited}
                    onClick={() => store.dispatch(clear())}
                >
                    ⟲ Clear
                </button>

                <button 
                    className='check'
                    disabled={isSolved || isValidTgr}
                    onClick={this.validateTrigger.bind(this)}
                >
                    Validate
                </button>

                <button
                    className='solve'
                    disabled={!validate}
                    onClick={this.solveTrigger.bind(this)}
                >
                    Solve
                </button>
            </div>
        )
    }
}


export default APP;