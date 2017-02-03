import { PLAYERS, PLAYER_COUNT } from '../constants/game';

export function getNextPlayer(game) {
  const player = (game.currentMove.player) ? game.currentMove.player : PLAYERS.FIRE;
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
