// One run at a whole table: every fact once, four minutes, and a square for
// each. Mirrors Squares/Model/GridRound.swift in the iOS app.
//
// Steps allows 2.6 seconds an answer (70 for 27). The whole table with no
// repetition, and a miss costing the lot, is harder than that, so a Grid
// round allows just under 3.

import { titleCase } from './name'

export const GRID_SECONDS = 240
export const GRID_SIDE = 9

// Grid keeps its own bests: a whole table at once is not the same feat as a
// level, so the two are never mixed. Keyed by operator.
export function gridKey (name) {
  return titleCase(name) + '_grid'
}

export function gridRecords (name) {
  return JSON.parse(localStorage.getItem(gridKey(name))) || {}
}

export function saveGridRecords (name, records) {
  localStorage.setItem(gridKey(name), JSON.stringify(records))
}

// A round counts down from the time it is given, so a faster one is worth
// more. The best is the lowest time recorded.
export function gridBest (name, op, base) {
  const mine = gridRecords(name)[op]
  if (!mine) { return 0 }
  const times = Object.values(mine).map(Number).filter(n => !isNaN(n))
  if (!times.length) { return 0 }
  const fastest = times.sort((a, b) => a - b)[0]
  return Math.max(0, base - fastest)
}

// Adding, taking away, multiplying or dividing by one teaches nothing that is
// not already in the number itself, so the table leaves those out. Plus and
// times lose the row as well as the column, because 1 + 7 is the same fact as
// 7 + 1; minus and divide only ever apply the column, so only the column goes.
export function factCounts (op, fact) {
  if (fact.b === 1) { return false }
  if ((op === '+' || op === 'X') && fact.a === 1) { return false }
  return true
}

// Every fact in the table, in a new order.
export function shuffledFacts (op) {
  const facts = []
  for (let a = 1; a <= GRID_SIDE; a++) {
    for (let b = 1; b <= GRID_SIDE; b++) {
      if (factCounts(op, { a: a, b: b })) { facts.push({ a: a, b: b }) }
    }
  }
  for (let i = facts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = facts[i]
    facts[i] = facts[j]
    facts[j] = swap
  }
  return facts
}

// The number shown first. Minus and divide read their own table backwards,
// so the pair that makes the answer is what is shown.
export function firstOf (op, fact) {
  if (op === '-') { return fact.a + fact.b }
  if (op === 'd') { return fact.a * fact.b }
  return fact.a
}

export function answerOf (op, fact) {
  if (op === '+') { return fact.a + fact.b }
  if (op === 'X') { return fact.a * fact.b }
  return fact.a // '-' and 'd' give back the row
}

export function factKey (fact) {
  return fact.a + 'x' + fact.b
}

// What Grid practice drills: the facts most recently missed, by operator.
export function gridMissKey (name) {
  return titleCase(name) + '_gridmiss'
}

export function gridMisses (name) {
  return JSON.parse(localStorage.getItem(gridMissKey(name))) || {}
}

export function saveGridMisses (name, misses) {
  localStorage.setItem(gridMissKey(name), JSON.stringify(misses))
}

// The ten most recent misses, newest first. A fact missed again moves back to
// the front rather than being kept twice.
export function recordMiss (name, op, fact) {
  if (!name) { return }
  const all = gridMisses(name)
  const mine = (all[op] || []).filter(p => !(p[0] === fact.a && p[1] === fact.b))
  mine.unshift([fact.a, fact.b])
  all[op] = mine.slice(0, 10)
  saveGridMisses(name, all)
}

// Each missed fact both ways round: 4 x 5 missed is 5 x 4 to practise too.
// A fact the table leaves out is left out here.
export function practiceFacts (name, op) {
  const saved = gridMisses(name)[op] || []
  const seen = {}
  const list = []
  saved.forEach(pair => {
    if (pair.length !== 2) { return }
    ;[{ a: pair[0], b: pair[1] }, { a: pair[1], b: pair[0] }].forEach(fact => {
      const key = factKey(fact)
      if (!factCounts(op, fact) || seen[key]) { return }
      seen[key] = true
      list.push(fact)
    })
  })
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = list[i]
    list[i] = list[j]
    list[j] = swap
  }
  return list
}
