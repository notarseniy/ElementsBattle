import React, { Component } from 'react';
import { isNil, find, propEq, filter } from 'ramda';
import { ELEMENT_STATUS, START_ELEMENTS } from '../../constants/game.js';

class Element extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    const isStartLocation = (x, y) => !isNil(find(propEq('x', x))(filter(propEq('y', y))(START_ELEMENTS)));
    const row = props.row;
    const column = props.column;
    
    console.log(props, isStartLocation(row, column));
    
    this.state = {
      x: row,
      y: column,
      status: ELEMENT_STATUS.EMPTY,
      isStartLocation: isStartLocation(row, column)
    };
  }
  
  handleClick() {
    const isEmpty = this.state.status === ELEMENT_STATUS.EMPTY;
    
    this.setState({
      status: (isEmpty) ? ELEMENT_STATUS.FULL : ELEMENT_STATUS.HALF
    });
  }
  
  render() {
    const isStartLocation = (!!this.state.isStartLocation) ? 'element--start' : '';
    const isHalf = (this.state.status === ELEMENT_STATUS.HALF) ? 'element--half' : '';
    const isFull = (this.state.status === ELEMENT_STATUS.FULL) ? 'element--full' : '';
    
    return (
      <div className={`element ${isStartLocation} ${isHalf} ${isFull}`} onClick={::this.handleClick}></div>
    );
  }
}
