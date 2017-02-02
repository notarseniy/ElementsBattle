export const SQUARE_SIDE = 20;

export const ELEMENT_STATUS = {
  EMPTY: 0,
  HALF: 1, // курган
  FULL: 2 // голем
};

export const START_ELEMENTS = [
  // Top Left
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  // Top Right
  { x: 20, y: 1 },
  { x: 20, y: 2 },
  { x: 19, y: 1 },
  // Bottom Left
  { x: 1, y: 20 },
  { x: 1, y: 19 },
  { x: 2, y: 20 },
  // Bottom Right
  { x: 20, y: 20 },
  { x: 20, y: 19 },
  { x: 19, y: 20 }
];
