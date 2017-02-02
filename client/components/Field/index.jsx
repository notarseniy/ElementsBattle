import React, { Component } from 'react';
import Row from '../Row';
import { SQUARE_SIDE } from '../../constants/game.js';
import style from './style.css';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { game, actions, children } = this.props;
      
    let rows = [];
    
    for (let row = 1; row <= SQUARE_SIDE; row++) {
      rows.push(
        <Row key={row-1} row={row} />
      );
    }
    
    return (
      <div className={`${style.field} ${style.twenty} `}>
        {rows}
      </div>
    );
  }
}

export default Field;
