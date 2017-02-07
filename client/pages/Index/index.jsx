import React, { Component } from 'react';
import style from './style.css';
import pageStyle from '../style.css';
import playerUIstyle from '../../components/UI/Player/style.css';
import { Link, browserHistory } from 'react-router';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleButtonClick(event) {
    browserHistory.push('/select');
  }

  render() {
    return (
      <div className={pageStyle.page}>
        <h1 className={pageStyle.pageHeader}>
          <div className={pageStyle.smallHeader}>Добро пожаловать на </div>
          <div className={pageStyle.bigHeader}>Битву Стихий!</div>
        </h1>
        <p className={pageStyle.text}>
          Битва Стихий — это пошаговая стратегия для двух, трех или четырех игроков.<br />
          Каждый игрок — представитель одной из четырёх стихий.
        </p>
        <button className={pageStyle.button} onClick={::this.handleButtonClick}>Одиночная игра</button>
      </div>
    );
  }
}

export default Index;
