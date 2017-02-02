import React, { Component } from 'react';
import { isNil, find, propEq, filter } from 'ramda';
import { ELEMENT_STATUS, START_ELEMENTS } from '../../constants/game.js';
import style from './style.css';

class Cell extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  handleClick() {
    const { game, row, column } = this.props;
    const { cellChangeStatus } = this.props.actions;
    const isEmpty = game.field[row-1][column-1].status === ELEMENT_STATUS.EMPTY;

    cellChangeStatus({
      row: row,
      column: column,
      status: (isEmpty) ? ELEMENT_STATUS.FULL : ELEMENT_STATUS.HALF
    });
  }
  
  render() {
    const { game, actions, row, column } = this.props;

    const cell = game.field[row-1][column-1];

    const isStartLocation = (!!cell.isStartLocation) ? style.start : '';
    const isHalf = (cell.status === ELEMENT_STATUS.HALF) ? style.half : '';
    const isFull = (cell.status === ELEMENT_STATUS.FULL) ? style.full : '';
    
    return (
      <div className={`${style.cell} ${isStartLocation} ${isHalf} ${isFull}`} onClick={::this.handleClick}></div>
    );
  }
}

export default Cell;
