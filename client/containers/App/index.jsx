import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UI from '../../components/UI';
import Field from '../../components/Field';
import Copyright from '../../components/Copyright';
import * as GameActions from '../../actions/game';
import style from './style.css';


class App extends Component {
  componentWillMount() {
    const { gameStart } = this.props.actions;

    // TODO: Make selection UI
    gameStart({
      water: true,
      air: true,
      earth: true,
      fire: true
    })
  }

  render() {
    const { game, actions, children } = this.props;
    const appProps = { game, actions };

    return (
      <div className={style.container}>
        <div className={style.wrap}>
          <UI {...appProps} />
          <Field {...appProps} />
          <Copyright />
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
)(App);
