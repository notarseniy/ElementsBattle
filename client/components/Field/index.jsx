import React, { Component } from 'react';
import Row from '../Row';
import { ELEMENT_STATUS, SQUARE_SIDE, MOVE_ERROR, MOVES_COUNT, PLAYERS, PLAYER_COUNT } from '../../constants/game.js';
import style from './style.css';
import * as Game from '../../lib/game.js';

class Field extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  makeMove() {
    const checkMove = (row, column, player) => {
      console.log('checkMove :: arguments', row, column, player);
      /**
       * Here's visual interpretation of what the fuck is going on:
       * mask:
       * | 0 | 1 | 2 |
       * | 3 |(4)| 5 |
       * | 6 | 7 | 8 |
       *
       * (4) — is the target cell. In next cycle we're pass this cell
       *
       * We're going to check all cells around for some game-specific conditions
       **/

      const mask = [
        [ -1, -1 ],
        [ 0, -1 ],
        [ 1, -1 ],
        [ -1, 0 ],
        // ← here's could be 0 0 or (4)
        [ 1, 0 ],
        [ -1, 1 ],
        [ 0, 1 ],
        [ 1, 1 ]
      ];
      const { game } = this.props;
      const currentCell = game.field[row-1][column-1];
      let newStatus = null;
      
      console.log('makeMove :: currentCell:', game.currentMove, currentCell, row, column);
      // test current position
      // if current cell is on someone's half (kurgan, курган)
      if (currentCell.status === ELEMENT_STATUS.HALF) {
        return {
          ok: false,
          error: MOVE_ERROR.SOMEONE_HALF
        };
      }

      // if current cell is on our full (golem, голем)
      if (
        currentCell.status === ELEMENT_STATUS.FULL &&
        currentCell.player === player
      ) {
        return {
          ok: false,
          error: MOVE_ERROR.OUR_FULL
        };
      }

      // if this is first move we should check for start position
      if (
        game.currentMove.moveCount === 1 &&
        game.currentMove.remain === MOVES_COUNT
      ) {
        if (
          currentCell.isStartLocation &&
          currentCell.player === game.currentMove.player
        ) {
          return {
            ok: true,
            row,
            column,
            newStatus: ELEMENT_STATUS.FULL
          };
        } else {
          return {
            ok: false,
            error: MOVE_ERROR.NOT_START_CELL
          };
        }
      }

      // check if someones full
      if (
        currentCell.status === ELEMENT_STATUS.FULL
      ) {
        newStatus = ELEMENT_STATUS.HALF;
      } else {
        newStatus = ELEMENT_STATUS.FULL;
      }

      let isPlayerFullExists = null;
      // TODO: Check for active connects
      let isPlayerActiveConnectExists = null;

      for (let i = 0; i < 8; i++) {
        let testRow = (row - 1) + mask[i][0];
        let testColumn = (column - 1) + mask[i][1];
        
        

        // If out of bounds
        if (testRow >= 20 || testRow < 0 || testColumn >= 20 || testColumn < 0) {
          continue;
        }
        
        let testCell = game.field[testRow][testColumn];
        console.log('makeMove :: testRow:', testRow, ' testColumn:', testColumn, testCell);
        // our full
        if (
          testCell.player === player &&
          testCell.status === ELEMENT_STATUS.FULL
        ) {
          isPlayerFullExists = true;
        }

        // our half/connect
        if (
          testCell.player === player &&
          testCell.status === ELEMENT_STATUS.HALF
        ) {
          // FIXME: check for active connects by game logic
          isPlayerActiveConnectExists = true;
        }
      }

      if (isPlayerFullExists || isPlayerActiveConnectExists) {
        return {
          ok: true,
          row,
          column,
          newStatus
        };
      } else {
        return {
          ok: false,
          row,
          column,
          error: MOVE_ERROR.NO_CONNECT
        };
      }
    };

    console.log('makeMove :: this:', this);
    const { game, row, column } = this.props;
    const { cellChangeStatus, gameProcessMove, playerIncrementMove, gamePassNext } = this.props.actions;
    
    console.log('makeMove :: enter');

    const currentPlayer = game.currentMove.player;
    const status = checkMove(row, column, currentPlayer);

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
