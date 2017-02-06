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
    const { game, actions, row, makeMove } = this.props;
    const appProps = { game, actions, makeMove, setCellRefs: this.props.setCellRefs, fieldContext: this.props.fieldContext };
    
    for (let column = 1; column <= SQUARE_SIDE; column++) {
      elements.push(
        <Cell
          key={column-1}
          row={row}
          column={column}
          {...appProps}
        />
      );
    }
    
    return (
      <div className={style.row} role="row">
        {elements}
      </div>
    );
  }
}

export default Row;
