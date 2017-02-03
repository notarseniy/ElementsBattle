import React, { Component } from 'react';
import Cell from '../Cell';
import { SQUARE_SIDE } from '../../constants/game.js';
import style from './style.css';

class Row extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick() {
    console.log('test');
  }
  
  render() {
    let elements = [];
    const { game, actions, makeMove } = this.props;
    const appProps = { game, actions, makeMove };

    for (let column = 1; column <= SQUARE_SIDE; column++) {
      elements.push(
        <Cell key={column-1} row={this.props.row} column={column} {...appProps} />
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
