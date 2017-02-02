import { handleActions } from 'redux-actions'
import { PLAYERS, ELEMENT_STATUS, SQUARE_SIDE, PLAYER_COUNT, START_ELEMENTS } from '../constants/game.js';
import { repeat, map, addIndex, isNil, find, propEq, filter } from 'ramda';


// TODO: come up with state structure and actions
function generateInitialState() {
  const isStartLocation = (x, y) => (
    !isNil(
      find(
        propEq('x', x)
      )(
        filter(
          propEq('y', y)
        )(START_ELEMENTS)
      )
    )
  );

  function generateField() {
    let field = [];

    for (let row = 0; row < SQUARE_SIDE; row++) {
      field.push([]);

      for (let column = 0; column < SQUARE_SIDE; column++) {
        field[row].push({
          x: row+1,
          y: column+1,
          status: ELEMENT_STATUS.EMPTY,
          isStartLocation: isStartLocation(row+1, column+1)
        });
      }
    }

    return field;
  }

  return {
    // Номер текущего хода, 0 = игра не началась
    moveCount: 0,

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
      playing: false,
      moveCount: 0,
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
    return {
      ...state,
      players: generatePlayers(action.payload)
    }
  },

  /**
   * Increments moveCount of game
   **/
  'PLAYER_INCREMENT_MOVE' (state, action) {
    return {
      ...state,
      moveCount: state.moveCount + 1
    };
  },


  /* PLAYER */

  /**
   * Increments moveCount of player
   * @param {number} action.payload.playerId Player's id
   **/
  'PLAYER_INCREMENT_MOVE' (state, action) {
    const { playerId } = action.payload;
    let players = state.players;
    
    ++players[playerId].moveCount;

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

  /* CELL */

  /**
   * Changes cell's status
   * @param {number} action.payload.row Cell's row
   * @param {number} action.payload.column Cell's column
   * @param {enum} action.payload.status New status
   */
  'CELL_CHANGE_STATUS' (state, action) {
    const { row, column, status } = action.payload;
    let field = state.field;
    
    field[row-1][column-1].status = status;

    return {
      ...state,
      field
    }
  },
}, generateInitialState())
