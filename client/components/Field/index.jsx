import React, { Component } from 'react';
import Row from '../Row';
import { CELL_STATUS, SQUARE_SIDE, MOVE_ERROR, MOVES_COUNT, PLAYERS, PLAYER_COUNT, KEYS, PRESS_LOOP_SPEED, PRESS_LOOP_INTERNAL_SPEED, UNDO_COUNT } from '../../constants/game.js';
import style from './style.css';
import * as Game from '../../lib/game.js';
import { times } from 'ramda';

class Field extends Component {
  constructor(props, context) {
    super(props, context);

    // Refs of all cells
    this.cellRefs = times(() => times(() => null, SQUARE_SIDE), SQUARE_SIDE);
    this.focusedCell = [0, 0];
  }
  
  makeMove(row, column) {
    const { game } = this.props;
    const { cellChangeStatus, gameProcessMove, playerIncrementMove, gamePassNext } = this.props.actions;
    
    console.log('makeMove :: enter', this);

    const currentPlayer = game.currentPlayer.player;
    const status = Game.checkMove(row, column, game);

    console.log('makeMove :: status: ', status);

    this.focusCell(row, column);

    if (status.ok) {
      gameProcessMove({
        row,
        column,
        newStatus: status.newStatus,
        player: currentPlayer
      });

      // if remain gone
      if (game.currentPlayer.remain <= 1) {
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
    // don't waste energy if nothing changes
    if (
      this.focusedCell[0] === row &&
      this.focusedCell[1] === column
    ) return;

    this.focusedCell = [row, column];
    this.cellRefs[row-1][column-1].focus();
  }

  undoMove(keyPress) {
    let { game } = this.props;
    let { gameUndoMove } = this.props.actions;

    if (
      keyPress[KEYS.BACKSPACE] &&
      game.currentPlayer.undoCount < UNDO_COUNT &&
      game.currentPlayer.remain !== 7
    ) {
      gameUndoMove();
    } else {
      // FIXME: Make error message
      return;
    }
  }

  moveFocusCell(keyPressed) {
    const row = this.focusedCell[0];
    const column = this.focusedCell[1];

    switch (true) {
      case keyPressed[KEYS.UP] && keyPressed[KEYS.LEFT]:
        if (row === 1 || column === 1) break;
        this.focusCell(
          row - 1,
          column - 1
        );
        break;
      case keyPressed[KEYS.UP] && keyPressed[KEYS.RIGHT]:
        if (row === 1 || column === SQUARE_SIDE) break;
        this.focusCell(
          row - 1,
          column + 1
        );
        break;
      case keyPressed[KEYS.DOWN] && keyPressed[KEYS.LEFT]:
        if (row === SQUARE_SIDE || column === 1) break;
        this.focusCell(
          row + 1,
          column - 1
        );
        break;
      case keyPressed[KEYS.DOWN] && keyPressed[KEYS.RIGHT]:
        if (row === SQUARE_SIDE || column === SQUARE_SIDE) break;
        this.focusCell(
          row + 1,
          column + 1
        );
        break;
      case keyPressed[KEYS.UP]:
        if (row === 1) break;
        this.focusCell(
          row - 1,
          column
        );
        break;
      case keyPressed[KEYS.DOWN]:
        if (row === SQUARE_SIDE) break;
        this.focusCell(
          row + 1,
          column
        );
        break;
      case keyPressed[KEYS.LEFT]:
        if (column === 1) break;
        this.focusCell(
          row,
          column - 1
        );
        break;
      case keyPressed[KEYS.RIGHT]:
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

    let keyPressed = {
      [KEYS.UP]: false,
      [KEYS.DOWN]: false,
      [KEYS.LEFT]: false,
      [KEYS.RIGHT]: false,
      [KEYS.BACKSPACE]: false
    };
    let canPress = true;;

    document.addEventListener('keydown', (event) => {
      keyPressed[event.keyCode] = true;
    });

    document.addEventListener('keyup', (event) => {
      keyPressed[event.keyCode] = false;
    });

    const pressLoop = () => {
      if (canPress) {
        this.undoMove(keyPressed);
        this.moveFocusCell(keyPressed);
      }
      canPress = false;

      setTimeout(pressLoop, PRESS_LOOP_INTERNAL_SPEED);
    };
    const checkPressLoop = () => {
      canPress = true;

      setTimeout(checkPressLoop, PRESS_LOOP_SPEED);
    };
    
    checkPressLoop();
    pressLoop();
  }

  render() {
    const { game, actions, children } = this.props;
    const appProps = { game, actions, makeMove: this.makeMove, focusCell: this.focusCell, setCellRefs: this.setCellRefs, fieldContext: this };
    
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
