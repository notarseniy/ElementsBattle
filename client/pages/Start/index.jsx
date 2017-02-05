import React, { Component } from 'react';
import style from './style.css';
import { Link, browserHistory } from 'react-router';
import { PLAYERS_NAMES, PLAYER_COUNT, PLAYERS_TITLES } from '../../constants/game';

class Start extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      water: false,
      air: false,
      earth: false,
      fire: false,
      playersLength: 0
    };
  }

  handlePlayersCheckboxChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    const playersLength = (value) ? this.state.playersLength + 1 : this.state.playersLength - 1;

    this.setState({
      [name]: value,
      playersLength
    });
  }

  handleLinkClick(event) {
    const { gameStart } = this.props.actions;
    
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (this.state.playersLength > 1) {
      gameStart(this.state);
      browserHistory.push('/play');
    }

    return false;
  }

  render() {
    const { game, actions } = this.props;
    const appProps = { game, actions };

    return (
      <div className={style.page}>
        <h1 className={style.header}>
          <div className={style.smallHeader}>Добро пожаловать на </div>
          Битву Стихий!
        </h1>
        <p className={style.description}>
          Битва Стихий — это пошаговая стратегия для двух, трех или четырех игроков.<br />
          Каждый игрок — представитель одной из четырёх стихий.
        </p>
        <h3 className={style.formHeader}>Выберите стороны света</h3>
        <div className={style.form}>
          {this.renderForm()}
        </div>
        <button onClick={::this.handleLinkClick} className={style.startLink}>Начать игру</button>
      </div>
    );
  }

  renderForm() {
    let $form = [];

    for (let player = 0; player < PLAYER_COUNT; player++) {
      $form.push(
        <div key={player} className={style.formElement}>
          <label><input className={style.formInput} type="checkbox" name={PLAYERS_NAMES[player]} onChange={::this.handlePlayersCheckboxChange} />{PLAYERS_TITLES[player]}</label>
        </div>
      );
    }

    return $form;
  }
}

export default Start;
