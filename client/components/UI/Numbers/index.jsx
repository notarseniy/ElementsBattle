import React, { Component } from 'react';
import style from './style.css';
import { SQUARE_SIDE } from '../../../constants/game';

class Numbers extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { isVertical } = this.props;
    let $numbers = [];
    let classname = (isVertical) ? style.verticalNumbers : style.horizontalNumbers;

    for (let i = 1; i <= SQUARE_SIDE; i++) {
      $numbers.push(
        <span key={i-1} className={style.number}>{i}</span>
      );
    }

    return (
      <div className={classname}>{$numbers}</div>
    )
  }
}

export default Numbers;
