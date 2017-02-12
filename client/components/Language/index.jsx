import React, { Component } from 'react';
import style from './style.css';
import i18n from '../../i18n';

class Language extends Component {
  constructor(props, context) {
    super(props, context);
    const language = i18n.language;

    this.state = {
      language
    };
  }

  handleClick(lang) {
    const toggle = lang => i18n.changeLanguage(lang);

    toggle(lang);
    this.setState({
      language: lang
    });
  }
  
  render() {
    return (
      <div className={style.language}>
        <a className={(this.state.language === 'ru') ? style.active : ''} tabIndex="0" onClick={() => this.handleClick('ru')}>русский</a> :: <a className={(this.state.language === 'en') ? style.active : ''} tabIndex="0" onClick={() => this.handleClick('en')}>english</a>
      </div>
    )
  }
}

export default Language;
