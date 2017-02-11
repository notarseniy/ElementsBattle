import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { router5Middleware, router5Reducer  } from 'redux-router5';

import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(router, initialState = {}) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router),
    logger
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
