
import { createAction } from 'redux-actions'

// TODO: Add actions, see /client/reducers/game.js

export const gameStart = createAction('GAME_START');

export const playerIncrementMove = createAction('PLAYER_INCREMENT_MOVE');
export const playerLose = createAction('PLAYER_LOSE');

export const cellChangeStatus = createAction('CELL_CHANGE_STATUS');
