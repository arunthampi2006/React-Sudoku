import React, { Component } from 'react';
import SolveGrid from './solve-grid'

class SolveResult extends Component {
    render() {
        const {store} = this.props;
        const {sudoGrid} = store.getState();
        const {solvedGrids} = sudoGrid
        const renderSolveGrids = (solvedGrid, i) => {
            let idx = i + 1;
            return (
                <SolveGrid 
                solvedGrid={solvedGrid} 
                idx={idx}
                isSolved={true} 
                {...this.props}
                />
            )
        }

        return(
            <div className="solve-result-container">
                {solvedGrids.map(renderSolveGrids.bind(this))}
            </div>
        )
    }
}

export default SolveResult