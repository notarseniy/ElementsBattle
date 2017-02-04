import React, { Component } from 'react';
import { PLAYERS, PLAYER_COUNT } from '../../constants/game';
import style from './style.css';
import PlayerUI from '../PlayerUI';
import NumbersUI from '../NumbersUI';
import { numberDeclination, numberEnding } from '../../lib/utils';

class UI extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { game, actions, children } = this.props;
    const $players = [];

    // if game started
    if (game.players) {
      for (let player = 0; player < PLAYER_COUNT; player++) {
        const current = (game.currentMove.player === player) ? game.currentMove : false;

        $players.push(
          <PlayerUI key={player} player={game.players[player]} current={current} />
        );
      }
    }
   
    return (
      <div className={style.ui}>
        <h1 className={style.header}>Битва стихий</h1>
        <div className={style.moveCount}>{this.renderMoveCount(game.currentMove.moveCount)}</div>
        {$players}
        <NumbersUI isVertical={true} />
        <NumbersUI isVertical={false} />
      </div>
    );
  }

  renderMoveCount(moveCount) {
    if (moveCount !== 0) {
      return `Идёт ${moveCount}${numberEnding(moveCount)} ход`
    } else {
      return 'Начните игру';
    }
  }
}

export default UI;
