import React, { Component } from 'react';
import Row from '../Row';
import { CELL_STATUS, SQUARE_SIDE, MOVE_ERROR, MOVES_COUNT, PLAYERS, PLAYER_COUNT } from '../../constants/game.js';
import style from './style.css';
import * as Game from '../../lib/game.js';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  makeMove() {
    const { game, row, column } = this.props;
    const { cellChangeStatus, gameProcessMove, playerIncrementMove, gamePassNext } = this.props.actions;
    
    console.log('makeMove :: enter');

    const currentPlayer = game.currentMove.player;
    const status = Game.checkMove(row, column, game);

    console.log('makeMove :: status: ', status);

    if (status.ok) {
      gameProcessMove({
        row,
        column,
        newStatus: status.newStatus,
        player: currentPlayer
      });

      // if remain gone
      if (game.currentMove.remain <= 1) {
        console.log('makeMove - remain <= 1 :: ', game, Game.getNextPlayer(game));
        gamePassNext(Game.getNextPlayer(game));
        playerIncrementMove(currentPlayer);
      }
    } else {
      // TODO: Show error
      return false;
    }
  }

  render() {
    const { game, actions, children } = this.props;
    const appProps = { game, actions, makeMove: this.makeMove };
      
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
