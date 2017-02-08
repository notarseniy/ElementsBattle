import { PLAYERS } from '../constants/game';

export default {
  common: {
    title: 'Battle of the Elements',
    players: {
      [PLAYERS.WATER]: 'Water',
      water: 'Water',
      [PLAYERS.AIR]: 'Air',
      air: 'Air',
      [PLAYERS.EARTH]: 'Earth',
      earth: 'Earth',
      [PLAYERS.FIRE]: 'Fire',
      fire: 'Fire'
    }
  },
  index: {
    pageHeader: {
      smallHeader: 'Welcome to ',
      bigHeader: 'Battle of the Elements!'
    },
    text: 'Battle of the Elements — a turn-based strategy for two, three or four players.<br />Every player is playing for one of four Elements.',
    singlePlayButton: 'Single play' 
  },
  select: {
    pageHeader: 'Select elements',
    text: '',
    formHeader: 'Select elements',
    button: 'Start game!'
  },
  ui: {
    game: {
      'moveCount': '{{count}}-th move',
      'moveCount_interval': '(1){First move};(2){Second move};(3){Third move};',
    },
    player: {
      title: '{{player}}\'s move',
      remain: 'One cell left',
      remain_plural: '{{count}} cells left'
    }
  }
};
