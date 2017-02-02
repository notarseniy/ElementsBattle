import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Field from '../../components/Field';
import * as GameActions from '../../actions/game';
import style from './style.css';

class App extends Component {
  render() {
    const { game, actions, children } = this.props;
    
    return (
      <div className={style.container}>
        <Field />
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
)(App);
