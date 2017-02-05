export const SQUARE_SIDE = 20;

export const PLAYER_COUNT = 4;
export const PLAYERS = {
  WATER: 0,
  AIR: 1,
  EARTH: 2,
  FIRE: 3,
  0: 0,
  1: 1,
  2: 2,
  3: 3
};
export const PLAYERS_TITLES = {
  [PLAYERS.WATER]: 'Вода',
  [PLAYERS.AIR]: 'Воздух',
  [PLAYERS.EARTH]: 'Земля',
  [PLAYERS.FIRE]: 'Огонь'
};
export const PLAYERS_NAMES = {
  [PLAYERS.WATER]: 'water',
  [PLAYERS.AIR]: 'air',
  [PLAYERS.EARTH]: 'earth',
  [PLAYERS.FIRE]: 'fire'
};

export const MOVES_COUNT = 7;
export const MOVE_ERROR = {
  // no full or active half's around cell
  NO_CONNECT: 0,
  // TODO: use this
  // there's our half but not connected
  NO_ACTIVE_CONNECT: 1,
  // cell is on someone half
  SOMEONE_HALF: 2,
  // cell is on our full
  OUR_FULL: 3,
  // if first move and 7 remains: cell is not on start
  NOT_START_CELL: 4
};

export const CELL_STATUS = {
  EMPTY: 0,
  HALF: 1, // курган
  FULL: 2 // голем
};

export const START_ELEMENTS = [
  // Top Left — Water
  { column: 1, row: 1 },
  { column: 1, row: 2 },
  { column: 2, row: 1 },
  // Top Right — Air
  { column: 20, row: 1 },
  { column: 20, row: 2 },
  { column: 19, row: 1 },
  // Bottom Left — Earth
  { column: 20, row: 20 },
  { column: 20, row: 19 },
  { column: 19, row: 20 },
  // Bottom Right — Fire
  { column: 1, row: 20 },
  { column: 1, row: 19 },
  { column: 2, row: 20 }
];
