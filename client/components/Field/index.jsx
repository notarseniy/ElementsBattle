import React, { Component } from 'react';
import Row from '../Row';
import { CELL_STATUS, SQUARE_SIDE, MOVE_ERROR, MOVES_COUNT, PLAYERS, PLAYER_COUNT, KEYS } from '../../constants/game.js';
import style from './style.css';
import * as Game from '../../lib/game.js';
import { map, repeat } from 'ramda';

class Field extends Component {
  constructor(props, context) {
    super(props, context);

    // Refs of all cells
    this.cellRefs = map(() => repeat(null, 20), new Array(SQUARE_SIDE));
    this.focusedCell = [0, 0];
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

  setCellRefs(row, column, ref) {
    this.cellRefs[row-1][column-1] = ref;
  }

  focusCell(row, column) {
    this.cellRefs[row-1][column-1].focus();
    this.focusedCell = [row, column];
  }

  moveFocusCell(keyCode) {
    const row = this.focusedCell[0];
    const column = this.focusedCell[1];
    
    
    switch (event.keyCode) {
      case KEYS.UP:
        if (row === 1) break;
        this.focusCell(
          row - 1,
          column
        );
        break;
      case KEYS.DOWN:
        if (row === SQUARE_SIDE) break;
        this.focusCell(
          row + 1,
          column
        );
        break;
      case KEYS.LEFT:
        if (column === 1) break;
        this.focusCell(
          row,
          column - 1
        );
        break;
      case KEYS.RIGHT:
        if (column === SQUARE_SIDE) break;
        this.focusCell(
          row,
          column + 1
        );
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const { game, actions } = this.props;

    // set 1,1 cell as :focus
    this.focusCell(1, 1);

    document.addEventListener('keydown', (event) => {
      this.moveFocusCell(event.keyCode);
    });
  }

  render() {
    const { game, actions, children } = this.props;
    const appProps = { game, actions, makeMove: this.makeMove, setCellRefs: this.setCellRefs, fieldContext: this };
    
    let rows = [];
    
    for (let row = 1; row <= SQUARE_SIDE; row++) {
      rows.push(
        <Row key={row-1} row={row} {...appProps} />
      );
    }
    
    return (
      <div className={`${style.field} ${style.twenty} `} role="grid">
        {rows}
      </div>
    );
  }
}

export default Field;
