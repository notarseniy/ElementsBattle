import { handleActions } from 'redux-actions'
import { PLAYERS, CELL_STATUS, SQUARE_SIDE, PLAYER_COUNT, START_ELEMENTS, MOVES_COUNT } from '../constants/game.js';
import { repeat, map, addIndex, findIndex, equals, dropLast } from 'ramda';
import * as Game from '../lib/game.js';

// TODO: come up with state structure and actions
function generateInitialState() {
  /**
   * Get index of start location's element in START_ELEMENTS
   * @param {number} row Row
   * @param {number} column Column
   **/
  const getStartLocation = (row, column) => (
    findIndex(
      equals({
        row,
        column
      })
    )(START_ELEMENTS)
  );
  const getStartLocationPlayer = (index) => {
    if (index >= 0 && index <= 2) {
      return PLAYERS.WATER;
    } else if (index >= 3 && index <= 5) {
      return PLAYERS.AIR;
    } else if (index >= 6 && index <= 8) {
      return PLAYERS.EARTH;
    } else if (index >= 9 && index <= 11) {
      return PLAYERS.FIRE;
    } else {
      return null;
    }
  };

  function generateField() {
    let field = [];

    for (let row = 0; row < SQUARE_SIDE; row++) {
      field.push([]);

      for (let column = 0; column < SQUARE_SIDE; column++) {
        const startLocation = getStartLocation(row+1, column+1);
        const isStartLocation = startLocation !== -1;
        const startLocationPlayer = getStartLocationPlayer(startLocation);

        console.log('generateField :: ', startLocation, isStartLocation, startLocationPlayer);

        field[row].push({
          row: row+1,
          column: column+1,
          status: CELL_STATUS.EMPTY,
          player: (isStartLocation) ? startLocationPlayer : false,
          isStartLocation
        });
      }
    }

    return field;
  }

  return {
    // Current player
    currentPlayer: {
      player: null,

      // number of remain moves
      remain: MOVES_COUNT,

      moveCount: 0,

      undoCount: 0,

      // history of moves. need for undo
      // { old: {}, new: {} }
      history: []
    },

    // Текущее состояние поля
    field: generateField(),

    /*
     * Игроки
     *
     * По часовой стрелке с верхнего левого угла:
     * Вода, Воздух, Земля, Огонь
    */
    players: null
  };
};

/**
 * Generates players object
 * @param {object} players Configuration
 * @param {boolean} players.water Is playing or not
 * @param {boolean} players.air Is playing or not
 * @param {boolean} players.earth Is playing or not
 * @param {boolean} players.fire Is playing or not
 **/
function generatePlayers(players) {
  const makeDefault = (playerId) => (
    {
      id: playerId,
      // was in game, but lose
      playing: false,
      /* Number of current move
       * 0 = game is not started
       * 1 = first move, and so on
       **/
      moveCount: 1,


    }
  );

  return {
    [PLAYERS.WATER]: (players.water) ? makeDefault(PLAYERS.WATER) : false,
    [PLAYERS.AIR]: (players.air) ? makeDefault(PLAYERS.AIR) : false,
    [PLAYERS.EARTH]: (players.earth) ? makeDefault(PLAYERS.EARTH) : false,
    [PLAYERS.FIRE]: (players.fire) ? makeDefault(PLAYERS.FIRE) : false
  };
}

export default handleActions({

  /* GAME */
  
  /**
   * Set players config
   * @param {boolean} action.payload.water Is playing or not
   * @param {boolean} action.payload.air Is playing or not
   * @param {boolean} action.payload.earth Is playing or not
   * @param {boolean} action.payload.fire Is playing or not
   **/
  'GAME_START' (state, action) {
    const players = generatePlayers(action.payload);
    
    return {
      ...state,
      currentPlayer: {
        ...state.currentPlayer,
        moveCount: 1,
        player: Game.getNextPlayer({
          ...state,
          players
        })
      },
      players
    }
  },

  /**
   * Make move
   * @param {number} action.payload.row Cell's row
   * @param {number} action.payload.column Cell's column
   * @param {enum} action.payload.newStatus New status of cell
   * @param {enum} action.payload.player New player of cell
  **/
  'GAME_PROCESS_MOVE' (state, action) {
    const { row, column, newStatus, player } = action.payload;
    let field = state.field;
    const oldField = field[row-1][column-1];

    // change cell
    field[row-1][column-1] = {
      ...field[row-1][column-1],
      status: newStatus,
      player
    };

    return {
      ...state,
      field,
      currentPlayer: {
        ...state.currentPlayer,
        remain: state.currentPlayer.remain - 1,
        history: [
          ...state.currentPlayer.history,
          {
            old: oldField,
            new: field[row-1][column-1]
          }
        ]
      }
    }
  },

  /**
   * Undo move
   **/
  'GAME_UNDO_MOVE' (state, action) {
    let field = state.field;
    const history = state.currentPlayer.history;
    const lastMove = history[history.length - 1];
    const row = lastMove.old.row;
    const column = lastMove.old.column;

    field[row-1][column-1] = lastMove.old;

    return {
      ...state,
      field,
      currentPlayer: {
        ...state.currentPlayer,
        remain: state.currentPlayer.remain + 1,
        undoCount: state.currentPlayer.undoCount + 1,
        history: dropLast(1, history)
      }
    };
  },

  /**
   * Pass current move to next player in turn
   * @param {number} action.payload player
   **/
  'GAME_PASS_NEXT' (state, action) {
    const player = action.payload;

    return {
      ...state,
      currentPlayer: {
        player,
        remain: MOVES_COUNT,
        moveCount: state.players[player].moveCount,
        // flush history, because undo works only for current player
        undoCount: 0,
        history: []
      }
    };
  },


  /* PLAYER */

  /**
   * Increments moveCount of player
   * @param {number} action.payload Player's id
   **/
  'PLAYER_INCREMENT_MOVE' (state, action) {
    const player = action.payload;
    let players = state.players;
    
    ++players[player].moveCount;

    return {
      ...state,
      players
    };
  },

  /**
   * Set's 'playing' attribute to false
   * @param {number} playerId Player's id
   **/
  'PLAYER_LOSE' (state, action) {
    const { playerId } = action.payload;
    let players = state.players;
    
    players[playerId].playing = false;

    return {
      ...state,
      players
    };
  },

}, generateInitialState())
