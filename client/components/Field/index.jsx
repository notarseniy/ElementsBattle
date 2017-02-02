import React, { Component } from 'react';
import Row from '../Row';
import { SQUARE_SIDE } from '../../constants/game.js';
import style from './style.css';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _checkMove(row, column, player) {
    for (let i = 0; i < 8; i++) {

    }
  }
  
  makeMove() {
    const { game, actions, children } = this.props;
    

  }

  componentDidMount() {
    const { gameStart } = this.props.actions;

    // TODO: Make selection UI
    gameStart({
      fire: true,
      air: true
    })
  }

  render() {
    const { game, actions, children } = this.props;
    const appProps = { game, actions };
      
    let rows = [];
    
    for (let row = 1; row <= SQUARE_SIDE; row++) {
      rows.push(
        <Row key={row-1} row={row} {...appProps} />
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
