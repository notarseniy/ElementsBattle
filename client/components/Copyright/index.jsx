import React, { Component } from 'react';
import style from './style.css';

class Copyright extends Component {
  render() {
    return (
      <div className={style.copyright}>
        <a href="http://notarseniy.ru">Arseniy Maximov</a> :: <a href="http://github.com/notarseniy/ElementsBattle">GitHub</a>
      </div>
    )
  }
}

export default Copyright;
