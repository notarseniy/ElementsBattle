import { handleActions } from 'redux-actions'
import { INIT_TEAM } from '../constants/game.js';

// TODO: come up with state structure and actions
const initialState = {
  
  moveCount: 0,

  field: [
    
  ],

};

export default handleActions({
  'CHANGE_PAGE' (state, action) {
    return {
      ...state,
      page: action.payload
    }
  },
}, initialState)
