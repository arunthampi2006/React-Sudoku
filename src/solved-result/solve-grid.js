import React, { Component } from 'react'
import SolveBox from './solve-box'

class SolveGrid extends Component {
    render() {
        const {solvedGrid, idx, isSolved} = this.props;
        
        const renderSolveBox = (row, val, col) => {
            return (
                <SolveBox 
                    key={col}
                    col={col}
                    row={row}
                    val={val}
                    isSolved={isSolved}
                    {...this.props}
                />
            )
        }

        const renderSolvedRow = (vals, row) => {
            return (
                <tr key={row}>
                    {vals.map(renderSolveBox.bind(this, row))}
                </tr>
            )
        }

        return (
            <div className='solve-result'>
                <h5>Solved {idx}</h5>
                <table>
                    <tbody>
                        {solvedGrid.map(renderSolvedRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SolveGrid;
