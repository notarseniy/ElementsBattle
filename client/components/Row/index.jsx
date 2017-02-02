import React, { Component } from 'react';
import Cell from '../Cell';
import { SQUARE_SIDE } from '../../constants/game.js';
import style from './style.css';

class Row extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    let elements = [];
    
    for (let column = 1; column <= SQUARE_SIDE; column++) {
      elements.push(
        <Cell key={column-1} row={this.props.row} column={column} />
      );
    }
    
    return (
      <div className={style.row}>
        {elements}
      </div>
    );
  }
}

export default Row;
