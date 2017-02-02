import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Row from '../../components/Row';
import * as GameActions from '../../actions/game';
import style from './style.css';

class App extends Component {
  render() {
    const { game, actions, children } = this.props;
    let rows = [];
    
    for (let row = 1; row <= SQUARE_SIDE; row++) {
      rows.push(
        <Row row={row} />
      );
    }
    
    return (
      <div className="container">
        <div className="field field--twenty">
          {rows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
