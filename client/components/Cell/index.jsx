import React, { Component } from 'react';
import { isNil, find, propEq, filter } from 'ramda';
import { CELL_STATUS, START_ELEMENTS } from '../../constants/game.js';
import style from './style.css';

class Cell extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    const { game, actions, row, column, makeMove } = this.props;

    const cell = game.field[row-1][column-1];

    const isStartLocation = (!!cell.isStartLocation) ? style.start : '';
    const isHalf = (cell.status === CELL_STATUS.HALF) ? style.half : '';
    const isFull = (cell.status === CELL_STATUS.FULL) ? style.full : '';
    const player = (cell.player !== false) ? style['player' + cell.player] : '';

    return (
      <div className={`${style.cell} ${player} ${isStartLocation} ${isHalf} ${isFull}`} onClick={this.props.makeMove.bind(this)}></div>
    );
  }
}

export default Cell;
