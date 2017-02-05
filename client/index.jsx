import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import App from 'containers/App';
import Start from 'pages/Start';
import Game from 'pages/Game';

import configure from './store';

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Start} />
        <Route path="/play" component={Game} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
