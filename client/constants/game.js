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

export const ELEMENT_STATUS = {
  EMPTY: 0,
  HALF: 1, // курган
  FULL: 2 // голем
};

export const START_ELEMENTS = [
  // Top Left — Water
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  // Top Right — Air
  { x: 20, y: 1 },
  { x: 20, y: 2 },
  { x: 19, y: 1 },
  // Bottom Left — Earth
  { x: 20, y: 20 },
  { x: 20, y: 19 },
  { x: 19, y: 20 },
  // Bottom Right — Fire
  { x: 1, y: 20 },
  { x: 1, y: 19 },
  { x: 2, y: 20 }
];
