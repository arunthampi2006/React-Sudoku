import React, { Component } from 'react';
import Grid from './components/Grid';
import {isSolvable, isComplete} from './utils/sudoku';
import { solve, undo, clear} from './actions';

class APP extends Component {
    
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => { this.forceUpdate() })
    }
    
    componentWillMount() {
        this.unsubscribe && this.unsubscribe();
    }
    
    render() {
        const {store} = this.props;
        const {grid, status} = store.getState();
        const {isSolved, isEdited} = status;

        return (
            <div>
                
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
                    Check
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