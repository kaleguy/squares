# squares

> Memorize basic math facts quickly.

[Squares](https://www.trilog.app/squares) is a drill for the facts of the four
tables. Answer a set of problems without a mistake, inside a set time, and the
set is passed; pass them all and the facts are there for instant recall.

There is an iOS port in `../squares-ios`, built from this app and kept in step
with it. Scores are stored under the same keys and the same JSON shape in both,
so a record exported from a browser drops straight into the phone.

## The screens

- **A name** is the whole of signing in: no password, nothing sent anywhere,
  every score kept in this browser. Whoever played last is written to
  `localStorage` under `lastUser`, and the app opens on them. The field is
  shown only when the device knows no names; after that it is a list to tap,
  with **Add a name** to bring the field back. Five names is as many as it
  keeps: a sixth is answered with how to make room rather than with a rule
  standing there before anybody has met it. A name is swiped to the left to
  delete, which asks first, because it deletes that name's scores with it.
- **The operator menu** is the top of the app: the app's own name, the
  player's name on a bar, the four signs, and three circles - help, the
  scores, and the gear that sets the colours and keeps the names. Each sign is
  stamped on nine squares, which are the level menu behind it in miniature:
  the eight levels and the whole table, each lit as it is won.
- **A level menu** is nine tiles, three to a row: levels 2 to 9, each the
  whole of that number's facts, and `all`, which is the whole table in one
  sitting. One is left out, since adding, taking away, multiplying or dividing
  by one is already in the number itself.
- **A round** is twenty-seven answers, no mistakes, in seventy seconds. The
  squares along the top count the answers and the bar under them is the clock.
  A wrong answer reddens the problem and starts the run over, and that fact
  comes round more often afterwards. The boxes beside the problem are the
  clock and the last two scores there; touching them says what a score is.
  The deck never deals the same card twice running: coming round more often
  means extra copies of that card, and a plain shuffle used to put two of them
  side by side often enough that a twentieth of all deals repeated the problem
  just answered. `spread` in `src/store/index.js` reshuffles until nothing
  sits beside another of itself and the deck does not open on the card on
  show, so a restart on the clock and a wrap to a new order both come up on
  something else. The whole table is cheaper, holding every fact once: its
  `reset` only moves the opener to the back.
- **Practice** turns the clock off, says so at the head of the screen, and
  lists the level's facts above the problem.
- **The whole table** (`/gridcard/:operator`) deals every fact once against a
  200 second clock, over a ten by ten board, and keeps its best apart from the
  levels' under `<Name>_grid`.
- **Scores** (`/scores`) is the record over the days: levels won out of 36,
  points, days played, and a chart with two tabs. Only the 36 the menus can
  win are counted; a record can hold more, from before the thirds and level
  one came off the menu.

A level used to split into its three thirds, four tiles to a row, which made a
table read as twenty-four things to learn rather than eight. The thirds are
gone from the menus and from the code: one deck, one round length, one shape.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

The help page's screenshots are in `static/help`, shot from this app in the
default theme and cropped to the content. They are taken with the page zoomed
to 200%, so that each one carries twice the detail of the 324px column it is
shown in: a screenshot taken at 1:1 is soft on any retina screen. At that zoom
a screen is taller than the window, so each is captured in two or three passes
and joined, the join taken from the screen's own bounding box rather than
guessed.

[Icons by Real Favicon Generator](https://realfavicongenerator.net)
