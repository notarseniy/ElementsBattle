import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.css';
import { PLAYERS, PLAYER_COUNT } from '../../../constants/game';
import Player from '../Player';
import Numbers from '../Numbers';
import { numberDeclination, numberEnding } from '../../../lib/utils';

@translate(['common', 'ui'], { wait: true })
class Game extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { game, actions, t } = this.props;
    const $players = [];

    // if game started
    if (game.players) {
      for (let player = 0; player < PLAYER_COUNT; player++) {
        if (!game.players[player]) continue;

        const current = (game.currentPlayer.player === player) ? game.currentPlayer : false;

        $players.push(
          <Player key={player} player={game.players[player]} current={current} />
        );
      }
    }
   
    return (
      <div className={style.ui}>
        <h1 className={style.header}>{t('common:title')}</h1>
        <div className={style.moveCount}>{t('ui:game.moveCount_interval', { postProcess: 'interval', count: game.currentPlayer.moveCount })}</div>
        {$players}
        <Numbers isVertical={true} />
        <Numbers isVertical={false} />
      </div>
    );
  }
}

export default Game;
