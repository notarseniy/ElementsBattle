import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.css';
import { PLAYERS, PLAYERS_TITLES } from '../../../constants/game';
import { numberDeclination } from '../../../lib/utils';

@translate(['common', 'ui'], { wait: true })
class Player extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRemain(remain) {
    const { t } = this.props;

    // Осталось 5 клеток
    return `${numberDeclination(remain, ['Осталась', 'Осталось', 'Осталось'])} ${remain} ${numberDeclination(remain, ['клетка', 'клетки', 'клеток'])}`
  }

  render() {
    const { game, actions, t, player, current } = this.props;
    let $ui = null;
    let playerClass = (player) ? style['player-' + player.id] : '';
    
    if (current) {
      $ui = (
        <div className={`${style.currentPlayer} ${playerClass}`}>
          <div className={style.title}>{t('ui:player.title', { player: t('common:players.' + player.id).toLowerCase() })}</div>
          <div className={style.remain}>{t('ui:player.remain', { count: current.remain })}</div>
        </div>
      );
    } else {
      $ui = (
        <div className={`${style.player} ${playerClass}`}>
          {t('common:players.' + player.id)}
        </div>
      );
    }

    return $ui;
  }
}

export default Player;
