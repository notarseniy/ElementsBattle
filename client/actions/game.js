
import { createAction } from 'redux-actions'

// TODO: Add actions, see /client/reducers/game.js

export const gameStart = createAction('GAME_START');
export const gameUndoMove = createAction('GAME_UNDO_MOVE');
export const gameProcessMove = createAction('GAME_PROCESS_MOVE');
export const gamePassNext = createAction('GAME_PASS_NEXT');

export const playerIncrementMove = createAction('PLAYER_INCREMENT_MOVE');
export const playerLose = createAction('PLAYER_LOSE');
