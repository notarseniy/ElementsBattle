import { clone } from 'ramda';
import { PLAYERS, PLAYER_COUNT, CELL_STATUS, MOVES_COUNT, MOVE_ERROR } from '../constants/game';

export function getNextPlayer(game) {
  const player = (game.currentPlayer.player !== null) ? game.currentPlayer.player : PLAYERS.FIRE;
  const players = [
    PLAYERS.WATER,
    PLAYERS.AIR,
    PLAYERS.EARTH,
    PLAYERS.FIRE
  ];

  let testPlayer = player + 1;

  while (true) {
    if (testPlayer >= PLAYER_COUNT) testPlayer = 0;
    if (game.players[testPlayer]) return PLAYERS[testPlayer];

    testPlayer++;
  }
}

function getNeighbors(cell, game, field) {
  const mask = [
    [ -1, -1 ],
    [ 0, -1 ],
    [ 1, -1 ],
    [ -1, 0 ],
    // ← here's could be 0 0 or (4)
    [ 1, 0 ],
    [ -1, 1 ],
    [ 0, 1 ],
    [ 1, 1 ]
  ];
  const { row, column } = cell;
  let neighbors = [];

  for (let i = 0; i < 8; i++) {
    let testRow = (row - 1) + mask[i][0];
    let testColumn = (column - 1) + mask[i][1];
    
    // If out of bounds
    if (testRow >= 20 || testRow < 0 || testColumn >= 20 || testColumn < 0) {
      continue;
    }
    
    let testCell = field[testRow][testColumn];

    // if our 'full' then stop cycle and return array with one cell
    // why only one and this? because we're finding cell with this status
    if (
      testCell.status === CELL_STATUS.FULL &&
      testCell.player === game.currentPlayer.player
    ) {
      neighbors.push(testCell);
      break;
    }

    // if our 'half'
    if (
      testCell.status === CELL_STATUS.HALF &&
      testCell.player === game.currentPlayer.player
    ) {
      neighbors.push(testCell);
    }
  }

  return neighbors;
}

export function isHasConnect(row, column, game) {
  let openList = [];
  let field = clone(game.field);
  let startCell = field[row-1][column-1];
  let neighbors = null
  let neighbor = null
  let cell = null;
  let i = null;
  let l = null;

  // push the start pos into the queue
  openList.push(startCell);
  startCell.opened = true;

  // while the queue is not empty
  while (openList.length) {
    // take the front node from the queue
    cell = openList.shift();
    cell.closed = true;

    console.log('isHasConnect :: cell', cell, openList);
    // reached the end position
    if (
      // if start cell
      !(
        cell.row === row &&
        cell.column === column
      ) &&
      cell.status === CELL_STATUS.FULL &&
      cell.player === game.currentPlayer.player
    ) {
      return true;
    }

    neighbors = getNeighbors(cell, game, field);

    console.log('isHasConnect :: neighbors', neighbors);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];

      // skip this neighbor if it has been inspected before
      if (neighbor.closed || neighbor.opened) {
        continue;
      }

      openList.push(neighbor);
      neighbor.opened = true;
      neighbor.parent = cell;
    }
  }
  
  // fail to find connection
  return false;
}

export function checkMove(row, column, game) {
  const player = game.currentPlayer.player;

  console.log('checkMove :: arguments', row, column, player);
  const currentCell = game.field[row-1][column-1];
  let newStatus = null;
  
  console.log('makeMove :: currentCell:', game.currentPlayer, currentCell, row, column);
  // test current position
  // if current cell is on someone's half (kurgan, курган)
  if (currentCell.status === CELL_STATUS.HALF) {
    return {
      ok: false,
      error: MOVE_ERROR.SOMEONE_HALF
    };
  }

  // if current cell is on our full (golem, голем)
  if (
    currentCell.status === CELL_STATUS.FULL &&
    currentCell.player === player
  ) {
    return {
      ok: false,
      error: MOVE_ERROR.OUR_FULL
    };
  }

  // if this is first move we should check for start position
  if (
    game.currentPlayer.moveCount === 1 &&
    game.currentPlayer.remain === MOVES_COUNT
  ) {
    if (
      currentCell.isStartLocation &&
      currentCell.player === game.currentPlayer.player
    ) {
      return {
        ok: true,
        row,
        column,
        newStatus: CELL_STATUS.FULL
      };
    } else {
      return {
        ok: false,
        error: MOVE_ERROR.NOT_START_CELL
      };
    }
  }

  // check if someones full
  if (
    currentCell.status === CELL_STATUS.FULL
  ) {
    newStatus = CELL_STATUS.HALF;
  } else {
    newStatus = CELL_STATUS.FULL;
  }

  if (isHasConnect(row, column, game)) {
    return {
      ok: true,
      row,
      column,
      newStatus
    };
  } else {
    return {
      ok: false,
      row,
      column,
      error: MOVE_ERROR.NO_CONNECT
    };
  }
};
