import React, { Component } from 'react';
import { SQUARE_SIDE } from '../../constants/game.js';

class Row extends Component {
  render() {
    let elements = [];
    
    for (let column = 1; column <= SQUARE_SIDE; column++) {
      elements.push(
        <Element row={this.props.row} column={column} />
      );
    }
    
    return (
      <div className="row">
        {elements}
      </div>
    );
  }
}
