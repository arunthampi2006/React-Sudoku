import React, { Component } from 'react'
import Box from './box';

class Grid extends Component {
    render() {
        const {status, grid} = this.props;
        const {isSolved} = status;
        const renderBox = (row, val, col) => {
            return (
                <Box 
                    key={col}
                    col={col}
                    row={row}
                    val={val}
                    isSolved={isSolved}
                    {...this.props}
                />
            )
        }

        const renderRow = (vals, row) => {
            return (
                <tr key={row}>
                    {vals.map(renderBox.bind(this, row))}
                </tr>
            )
        }

        return (
            <table>
                <tbody>
                    {grid.map(renderRow)}
                </tbody>
            </table>
        )
    }
}

export default Grid;
