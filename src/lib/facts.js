// Which facts keep going wrong, and how much extra practice each one is owed.
//
// A fact is one card of one table, so 3x7 is the same fact whether it was met
// in level 3c or in 3d. Counting deals dice rather than cards, so it has no
// facts to track.
//
// Kept under its own storage key, away from the level records. Mirrors
// Facts.swift and the dealer in Store.swift, so the two apps read each other.

import { titleCase } from './name'

// Extra copies a card gets in the deck while it is owed practice. A miss goes
// straight to the top, and two right answers work it back out.
const MAX_WEIGHT = 2

const BASE_DECKS = {
  '': [1, 2, 3, 4, 5, 6, 7, 8, 9],
  A: [1, 2, 3],
  B: [4, 5, 6],
  C: [7, 8, 9]
}

export function factsKey (name) {
  return titleCase(name) + '_facts'
}

export function factKey (op, level, card) {
  return op + String(level).substring(0, 1) + ':' + card
}

export function getWeights (name) {
  if (!name) { return {} }
  try {
    return JSON.parse(localStorage.getItem(factsKey(name))) || {}
  } catch (e) {
    return {}
  }
}

// Note how the card just answered went, so the dealer can favour it.
export function noteFact (name, op, level, card, correct) {
  if (!name || op === 's') { return }
  const weights = getWeights(name)
  const key = factKey(op, level, card)
  const weight = weights[key] || 0
  const next = correct ? Math.max(0, weight - 1) : MAX_WEIGHT
  if (next === weight) { return }
  if (next === 0) {
    delete weights[key]
  } else {
    weights[key] = next
  }
  localStorage.setItem(factsKey(name), JSON.stringify(weights))
}

// The level's cards, plus an extra copy of each card that is owed practice, so
// what went wrong comes round again sooner. Every card is still in there once,
// so nothing drops out of the round.
export function weightedDeck (sublevel, name, op, level) {
  const letter = String(sublevel || '').toUpperCase()
  const base = BASE_DECKS['ABC'.indexOf(letter) > -1 ? letter : '']
  const cards = base.slice()
  if (!name || op === 's') { return cards }
  const weights = getWeights(name)
  base.forEach(function (card) {
    const weight = weights[factKey(op, level, card)] || 0
    for (let i = 0; i < weight; i++) { cards.push(card) }
  })
  return cards
}
