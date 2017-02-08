import { PLAYERS } from '../constants/game';

export default {
  common: {
    title: 'Битва стихий',
    players: {
      [PLAYERS.WATER]: 'Вода',
      water: 'Вода',
      [PLAYERS.AIR]: 'Воздух',
      air: 'Воздух',
      [PLAYERS.EARTH]: 'Земля',
      earth: 'Земля',
      [PLAYERS.FIRE]: 'Огонь',
      fire: 'Огонь'
    }
  },
  index: {
    pageHeader: {
      smallHeader: 'Добро пожаловать на ',
      bigHeader: 'Битву стихий!'
    },
    text: 'Битва Стихий — это пошаговая стратегия для двух, трёх или четырёх игроков.<br />Каждый игрок — представитель одной из четырёх стихий.',
    singlePlayButton: 'Одиночная игра' 
  },
  select: {
    pageHeader: 'Выбрать игроков',
    text: '',
    formHeader: 'Выберите стороны света',
    button: 'Начать игру'
  },
  ui: {
    game: {
      'moveCount': 'Идёт {{count}}-й ход',
      'moveCount_interval': 'Идёт {{count}}-й ход'
    },
    player: {
      title: 'Ходит {{player}}',
      remain_0: 'Осталась одна клетка',
      remain_1: 'Осталось {{count}} клетки',
      remain_2: 'Осталось {{count}} клеток'
    }
  }
};
