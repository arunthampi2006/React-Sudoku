import React, { Component } from 'react'
import {range, flatten, includes} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {inputValue} from '../actions'

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

class BOX extends Component {

    setIsFixed() {
        const {val} = this.props;
        this.setState({
            isFixed: val ? true : false, 
            isMount: true
        });
    }
    componentWillMount() {
        this.setIsFixed()
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val !== this.props.val
    }
    handleChange(e) {
        const {row, col, store} = this.props;
        const {sudoGrid} = store.getState();
        const {grid} = sudoGrid;
        const valRange = range(1,10);
        const isDeleted = e.target.value === '';
        const val = isDeleted ? 0 : parseInt(e.target.value);
        grid[row][col] = val
        const gridFlatern = flatten(grid);
        let isValidTgr = includes(gridFlatern, 0);
        let pattern = /^[1-9]{1,1}$/

        if ((pattern.test(val) && includes(valRange,val)) || isDeleted) {
            store.dispatch(inputValue({row, col, val, isValidTgr}));
        }
    }

    render() {
        const {row, col, val, isSolved, store} = this.props;
        const {status} = store.getState();
        const {isEdited} = status;
        const {isMount} = this.state;
        let {isFixed} = this.state;
        const valChk = val ? true : false;
        isFixed = !isMount ? isFixed : valChk;
        isFixed = isFixed && !isEdited;

        const input = (
            <input
                ref='input'
                style={{backgroundColor: getBoxColor(row, col)}}
                className={isFixed ? 'fixed' : isSolved ? 'result' : ''}
                disabled={isFixed}
                value={val ? val : ''}
                onChange={this.handleChange.bind(this)}
            />
        );

        return(
            <td>
                <div>{
                    // isSolved ?
                    // (
                    //     <ReactCSSTransitionGroup
                    //         transitionName='solved'
                    //         transitionAppear={true}
                    //         transitionEnterTimeout={400}
                    //         transitionAppearTimeout={400}
                    //         transitionLeaveTimeout={400}
                    //     >
                    //     </ReactCSSTransitionGroup>
                    // ) : input
                    input
                }</div>
            </td>
        )
    }
}

export default BOX;