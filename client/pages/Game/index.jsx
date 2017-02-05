import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import style from './style.css';
import UI from '../../components/UI';
import Field from '../../components/Field';

class Game extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { game } = this.props;

    // if got from direct link
    if (!game.players) {
      browserHistory.push('/');
      return;
    }
  }
  
  render() {
    const { game, actions } = this.props;
    const appProps = { game, actions };

    return (
      <div className={style.page}>
        <UI.Game {...appProps} />
        <Field {...appProps} />
      </div>
    )
  }
}

export default Game;
