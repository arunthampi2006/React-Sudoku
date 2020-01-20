import React, { Component } from 'react';
import SolveGrid from './solve-grid'

class SolveResult extends Component {
    render() {
        const {solvedGrids} = this.props;
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