import React, { Component } from 'react';
import style from './style.css';
import { PLAYERS, PLAYER_COUNT } from '../../../constants/game';
import Player from '../Player';
import Numbers from '../Numbers';
import { numberDeclination, numberEnding } from '../../../lib/utils';

class Game extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { game, actions, children } = this.props;
    const $players = [];

    // if game started
    if (game.players) {
      for (let player = 0; player < PLAYER_COUNT; player++) {
        const current = (game.currentPlayer.player === player) ? game.currentPlayer : false;

        $players.push(
          <Player key={player} player={game.players[player]} current={current} />
        );
      }
    }
   
    return (
      <div className={style.ui}>
        <h1 className={style.header}>Битва стихий</h1>
        <div className={style.moveCount}>{this.renderMoveCount(game.currentPlayer.moveCount)}</div>
        {$players}
        <Numbers isVertical={true} />
        <Numbers isVertical={false} />
      </div>
    );
  }

  renderMoveCount(moveCount) {
    if (moveCount !== 0) {
      return `Идёт ${moveCount}-й ход`
    } else {
      return 'Начните игру';
    }
  }
}

export default Game;
