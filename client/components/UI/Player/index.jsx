import React, { Component } from 'react';
import style from './style.css';
import { PLAYERS, PLAYERS_TITLES } from '../../../constants/game';
import { numberDeclination } from '../../../lib/utils';

class Player extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRemain(remain) {
    // Осталось 5 клеток
    return `${numberDeclination(remain, ['Осталась', 'Осталось', 'Осталось'])} ${remain} ${numberDeclination(remain, ['клетка', 'клетки', 'клеток'])}`
  }

  render() {
    const { game, actions, player, current } = this.props;
    let $ui = null;
    let playerClass = (player) ? style['player-' + player.id] : '';

    if (current) {
      $ui = (
        <div className={`${style.currentPlayer} ${playerClass}`}>
          <div className={style.title}>{`Ходит ${PLAYERS_TITLES[player.id].toLowerCase()}`}</div>
          <div className={style.remain}>{this.renderRemain(current.remain)}</div>
        </div>
      );
    } else {
      $ui = (
        <div className={`${style.player} ${playerClass}`}>
          {PLAYERS_TITLES[player.id]}
        </div>
      );
    }

    return $ui;
  }
}

export default Player;
