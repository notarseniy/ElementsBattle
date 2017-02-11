import { router5Reducer } from 'redux-router5';
import { combineReducers } from 'redux';
import game from './game';

const appReducer = combineReducers({
  router: router5Reducer,
  game
});

export default function rootReducer(state, action) {
  if (action.type === 'RESET_GAME') {
    state = undefined;
  }

  return appReducer(state, action);
}
