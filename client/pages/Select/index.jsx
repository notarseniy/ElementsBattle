import React, { Component } from 'react';
import style from './style.css';
import pageStyle from '../style.css';
import playerUIstyle from '../../components/UI/Player/style.css';
import { Link, browserHistory } from 'react-router';
import { PLAYERS_NAMES, PLAYER_COUNT, PLAYERS_TITLES } from '../../constants/game';

class Select extends Component {
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

  handleButtonClick(event) {
    const { gameStart } = this.props.actions;

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
      <div className={pageStyle.page}>
        <h1 className={pageStyle.pageHeader}>Выбрать игроков</h1>
        <p className={pageStyle.text}>
          Битва Стихий — это пошаговая стратегия для двух, трех или четырех игроков.<br />
          Каждый игрок — представитель одной из четырёх стихий.
        </p>
        <h3 className={style.formHeader}>Выберите стороны света</h3>
        {this.renderForm()}
        <button className={pageStyle.button} onClick={::this.handleButtonClick}>Начать игру</button>
      </div>
    );
  }

  renderForm() {
    let $form = [];

    for (let player = 0; player < PLAYER_COUNT; player++) {
      $form.push(
        <div key={player} className={`${style.formElement} ${playerUIstyle['player-' + player]}`}>
          <label><input className={style.formInput} type="checkbox" name={PLAYERS_NAMES[player]} onChange={::this.handlePlayersCheckboxChange} />{PLAYERS_TITLES[player]}</label>
        </div>
      );
    }

    return (
      <div className={style.form}>
        {$form}
      </div>
    );
  }
}

export default Select;
