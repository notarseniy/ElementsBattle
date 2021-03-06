# ElementsBattle
Реализация настольной игры «Клоподавка» (также известная как «Битва стихий») на JS. React + Redux + Ramda.

## TODO
- [x] Нормальная обработка курганов
- [x] Интерфейс выбора игроков
- [x] Управление с клавиатуры
- [x] Отмена хода
- [x] Нормальная сборка в продакшн
- [x] Доступность
- [x] Мультиязычность (перевод на английский)
- [ ] Обработка проигрыша
- [ ] Показ ошибок хода
- [ ] Мультиплеер:
  - Web Sockets: https://github.com/uWebSockets/uWebSockets
  - [ ] Синхронизация ходов
  - [ ] Комнаты
  - [ ] Чат 
  - [ ] Передача курсора (либо клетки, либо курсора)
- [ ] Серверный рендеринг
- [ ] Игра с ботами
- [ ] Гайд?
- [ ] Больше графики
- [ ] Написать API к игре для написания ботов
- [ ] Документация к коду
- [ ] Gamepad API

## Правила игры
Правила игры беру такие, которые я знаю по Битве Стихий из GreenCubes. Данная разновидность игры мне знакома лучше всего.

Цитата с [форума GreenCubes](https://forum.greencubes.org/viewtopic.php?f=257&t=21772#p327318).
```
Битва Стихий - это пошаговая стратегия для двух, трех или четырех игроков.
Каждый игрок - представитель одной из 4 стихий:

Огонь (красная броня, розовые блоки, красные полублоки)
Вода (синяя броня, голубые блоки, синие полублоки)
Земля (зеленая броня, салатовые блоки, зеленые полублоки)
Воздух (серая железная броня, светло-серые блоки, серые полублоки)

За игрой следят Верховный судья (Оранжевая броня) и судья на поле (фиолетовая броня).

Действие происходит на игровом поле, представляющем собой плоскую поверхность квадратной формы. Сторона квадрата равна 20 блоков. Для блиц-игры используется только светлая часть поля (сторона 14 блоков).
Игроки располагаются в башнях по углам игровой площадки в соответствии со своей стихией. 

Во время игры игроки находятся на специальных площадках, расположенных на угловых башнях арены, и выходят на игровое поле только во время своего хода. Также игрок может быть вызван судьей для решения спорных вопросов.

Игроки ходят по очереди, очередность определяется верховным судьей. За один ход игрок должен поставить ровно 7 блоков (големов). Если у игрока отсутствует возможность поставить все 7 блоков (големов), то ему засчитывается поражение, и он выбывает из игры.

Первый блок ставиться на любую из помеченных клеток в своем углу.
Для блиц-игры первый блок ставиться строго в углу светлого игрового поля.

Остальные блоки ставятся по следующим принципам:

Нельзя выходить за границы площадки.
Ставить блок можно либо на пустые клетки, либо на блоки противников. На полублоки (курганы) любого цвета ставить блоки нельзя.
Блоки могут ставиться только на те клетки, которые соприкасаются стороной или углом с блоком (големом) своего цвета. Либо на клетки, соприкасающиеся стороной или углом с полублоком (курганом) своего цвета, но только в том случае, если он связан по цепочке полублоков своего цвета с блоком (големом) своего цвета.

В случае, когда блок (голем) игрока ставится на блок противника, убираются оба блока, а на это место ставится полублок (курган) игрока соответствующего цвета. Блок противника как бы "съедается".

Цель игры - уничтожить все блоки (големы) противника или остаться единственным игроком, который сможет сделать полный ход (т.е. запереть всех игроков своими полублоками (курганами)).
```

## Стороны
Игра идёт по часовой стрелке:<br>
ЛВУ — Вода<br>
ПВУ — Воздух<br>
ПНУ — Земля<br>
ЛНУ — Огонь

http://imgur.com/a/Fj3qz#0

## Copyright

Arseniy Maximov, 2017 ©. [MIT License](https://github.com/notarseniy/ElementsBattle/blob/master/LICENSE)
