import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Language from '../../components/Language';
import Copyright from '../../components/Copyright';
import * as GameActions from '../../actions/game';
import style from './style.css';

class App extends Component {
  render() {
    const { game, actions, children } = this.props;

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       game,
       actions
     })
    );

    return (
      <main className={style.container}>
        {childrenWithProps}
        <Language />
        <Copyright />
      </main>
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
