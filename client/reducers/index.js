import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux';
import game from './game';

const appReducer = combineReducers({
  routing,
  game
});

export default function rootReducer(state, action) {
  if (action.type === 'RESET_GAME') {
    state = undefined;
  }

  return appReducer(state, action);
}
