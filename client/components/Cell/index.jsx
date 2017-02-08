import React, { Component } from 'react';
import { isNil, find, propEq, filter } from 'ramda';
import { CELL_STATUS, START_ELEMENTS } from '../../constants/game.js';
import style from './style.css';

class Cell extends Component {
  constructor(props, context) {
    super(props, context);

    this.refHandler = this.refHandler.bind(this);
  }

  handleClick() {
    const { row, column, makeMove, fieldContext } = this.props;

    makeMove.call(fieldContext, row, column);
  }

  handleFocus() {
    const { row, column, focusCell, fieldContext } = this.props;

    focusCell.call(fieldContext, row, column);
  }

  refHandler(ref) {
    this.cellRef = ref;
  }

  componentDidMount() {
    const { row, column, setCellRefs, fieldContext } = this.props;

    setCellRefs.call(fieldContext, row, column, this.cellRef);
  }

  render() {
    const { game, actions, row, column, makeMove } = this.props;

    const cell = game.field[row-1][column-1];

    const isStartLocation = (!!cell.isStartLocation) ? style.start : '';
    const isHalf = (cell.status === CELL_STATUS.HALF) ? style.half : '';
    const isFull = (cell.status === CELL_STATUS.FULL) ? style.full : '';
    const player = (cell.player !== false) ? style['player' + cell.player] : '';

    return (
      <button
        className={`${style.cell} ${player} ${isStartLocation} ${isHalf} ${isFull}`}
        type="button"
        role="gridcell"
        onClick={this.handleClick.bind(this)}
        onFocus={this.handleFocus.bind(this)}
      ref={this.refHandler}
      ></button>
    );
  }
}

export default Cell;
