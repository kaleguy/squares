// What the menus can win: the eight levels of a table, and the table itself.
//
// Levels three and four route to their d index rather than a bare 3, because
// the two are the same round and keeping d means a level passed when the
// thirds were still on the menu is still passed now they are gone.

export const MENU_LEVELS = ['2', '3d', '4d', '5d', '6d', '7d', '8d', '9d']

// The whole table, in the corner the rows end at.
export const TABLE_TILE = 'all'

export const OPERATORS = [
  { id: '+', name: 'Plus', glyph: '+' },
  { id: '-', name: 'Minus', glyph: '−' },
  { id: 'X', name: 'Times', glyph: '×' },
  { id: 'd', name: 'Divide', glyph: '÷' }
]

export function glyphFor (op) {
  const found = OPERATORS.filter(function (o) { return o.id === op })[0]
  return found ? found.glyph : op
}
