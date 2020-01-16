import React, { Component } from 'react';
import Grid from './components/Grid';
import {isSolvable, isComplete} from './utils/sudoku';
import { solve, undo, clear, ddChange} from './actions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import {randomSudoku} from './utils/randomsudoku'

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
    
    render() {
        const {store} = this.props;
        const {sudoGrid, status} = store.getState();
        const {grid, ddItems} = sudoGrid;
        const {isSolved, isEdited, isTrgr} = status;
        const {sudoSelected} = this.state;
        if (isTrgr) {
            return false;
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
                    disabled={isSolved}
                    onClick={() => {
                            if (isSolvable(grid)) { 
                                if (isComplete(grid)){
                                    return alert('Congratulation, you solved it');
                                }
                                return alert('This Sudoku is solvable, keep try on ...')
                            } else {
                                return alert('This Sudoku is not solvable')
                            }
                        }
                    }
                >
                    Validate
                </button>

                <button
                    className='solve'
                    onClick={() => store.dispatch(solve())}
                >
                    Solve
                </button>
            </div>
        )
    }
}

export default APP;