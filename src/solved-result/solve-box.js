import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const pallet = {
	'0': '#FAC22E', // Box 1
	'30': '#2EFABE', // Box 2
	'60': '#C8B6F9', // Box 3
	'3': '#E677FB', // Box 4
	'33': '#77A0FB', // Box 5
	'63': '#FF6347', // Box 6
	'6': '#D8FF47', // Box 7
	'36': '#FF4781', // Box 8
	'66': '#47FF51', // Box 9
};

const getBoxColor = (row, col) => {
    let rowGroup = row - (row % 3);
    let colGroup = (col - (col % 3))*10;

    return pallet[rowGroup + colGroup];
}

class SolveBox extends Component {

    render() {
        const {row, col, val, isSolved} = this.props;

        const resultBox = (
            <span 
                style={{backgroundColor: getBoxColor(row, col)}}
                className={isSolved ? 'span-box result' : 'span-box'}
            >
                {val}
            </span>
        );

        return(
            <td>
                <div>{
                    // isSolved ?
                    // (
                    //     <ReactCSSTransitionGroup
                    //         transitionName='solved'
                    //         transitionAppear={true}
                    //         transitionEnterTimeout={700}
                    //         transitionAppearTimeout={700}
                    //         transitionLeaveTimeout={700}
                    //     >
                    //     </ReactCSSTransitionGroup>
                    // ) : resultBox
                    resultBox
                }</div>
            </td>
        )
    }
}

export default SolveBox;