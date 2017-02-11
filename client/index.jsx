import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { RouterProvider  } from 'react-router5';
import { I18nextProvider  } from 'react-i18next';

import App from 'containers/App';
import Index from 'pages/Index';
import Select from 'pages/Select';
import Game from 'pages/Game';

import createRouter from './router';
import configure from './store';
import i18n from './i18n';

const router = createRouter();
const store = configure(router);
const history = syncHistoryWithStore(browserHistory, store);

router.start((err, state) => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <Route component={App}>
            <Route path="/" component={Index} />
            <Route path="/select" component={Select} />
            <Route path="/play" component={Game} />
          </Route>
        </RouterProvider>
      </Provider>
    </I18nextProvider>,
    document.getElementById('root')
  );
});
