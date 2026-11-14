// How long has gone into a table, counted while it is open.
//
// The twin of StudyTime.swift and StudyClock.swift in the iOS port: the same
// key, the same seconds, the same readout. A level's best time says how fast
// one round was and says nothing about how much of the week went into getting
// there, which is the number somebody doing this every evening wants.
//
// What counts is every screen that belongs to a table - its level menu, a
// card, the fact table, the whole-table board and its answers. Sitting on the
// level menu counts too: it is time at the table, not time with a problem on
// the screen, and a child reading the facts is not idling.
//
// Simpler than the iOS side in one way. There, one screen replaces another
// and the old one leaves a moment after the new one arrives, so a visit is
// held open by whichever screens currently own it. A router transition here
// is a single step, so the route is the whole truth.

import { titleCase } from './name'

// Seconds per operator, all time: "<Name>_time" -> { "+": 1234 }
export function timeKey (name) {
  return titleCase(name) + '_time'
}

export function studyTimes (name) {
  if (!name) { return {} }
  try {
    return JSON.parse(localStorage.getItem(timeKey(name))) || {}
  } catch (e) {
    return {}
  }
}

// The visit now open: which table, whose, and since when.
let open = null
let who = ''
let started = 0
let banker = null

// How often the running visit is banked. A tab closed without warning loses
// whatever has not been banked, and a quarter of a minute is a cheap bound to
// put on that.
const BANK_MS = 15000

// Which table a route belongs to, or null for the screens that belong to
// none - the name screen, the operator menu, the scores, the help.
export function operatorOf (route) {
  const parts = String(route.path || '').split('/').filter(Boolean)
  if (['menu', 'card', 'facts', 'gridcard', 'gridfacts'].indexOf(parts[0]) === -1) {
    return null
  }
  return (route.params && route.params.operator) || null
}

// Seconds spent on this table, the visit now open included.
export function seconds (op, name) {
  let total = studyTimes(name)[op] || 0
  if (open === op && who === name && started) {
    total += Math.max(0, Math.floor((Date.now() - started) / 1000))
  }
  return total
}

// Open the visit for this table, or close whatever is open. Called for every
// route change, so the common case is the same table again.
export function visit (op, name) {
  if (op === open && name === who) {
    if (op && !started) { resume() }
    return
  }
  flush(false)
  open = op || null
  who = name || ''
  started = open ? Date.now() : 0
  if (open) { startBanker() } else { stopBanker() }
}

// The tab is no longer in front. Bank what has been earned and stop the
// clock: a page left open in a background tab is not practice. The visit
// itself stays open, so coming back picks it up rather than starting a
// second one.
export function pause () {
  flush(false)
  stopBanker()
}

export function resume () {
  if (!open || started) { return }
  started = Date.now()
  startBanker()
}

// Write out what has run since the clock was last read. `restart` leaves the
// visit counting, for the bank the interval does. The seconds banked are
// whole ones and the clock is moved on by exactly those, so the fraction left
// over is carried rather than dropped.
function flush (restart) {
  if (!open || !started) { return }
  const added = Math.max(0, Math.floor((Date.now() - started) / 1000))
  started = restart ? started + added * 1000 : 0
  if (!added || !who) { return }
  const all = studyTimes(who)
  all[open] = (all[open] || 0) + added
  localStorage.setItem(timeKey(who), JSON.stringify(all))
}

function startBanker () {
  if (banker) { return }
  banker = window.setInterval(function () { flush(true) }, BANK_MS)
}

function stopBanker () {
  if (!banker) { return }
  window.clearInterval(banker)
  banker = null
}

// `0:00` until an hour, then `1:02:03`. The same readout the iOS app gives a
// table and the Kana app gives a script, since it is the same thing said.
export function readout (total) {
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const mm = minutes < 10 ? '0' + minutes : String(minutes)
  const ss = secs < 10 ? '0' + secs : String(secs)
  if (hours > 0) { return hours + ':' + mm + ':' + ss }
  return minutes + ':' + ss
}

// A clock face read aloud is a string of digits. This is the same time in
// words, for anyone who has the screen read to them.
export function spoken (total) {
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const parts = []
  if (hours > 0) { parts.push(hours + (hours === 1 ? ' hour' : ' hours')) }
  if (minutes > 0 || hours > 0) {
    parts.push(minutes + (minutes === 1 ? ' minute' : ' minutes'))
  }
  parts.push(secs + (secs === 1 ? ' second' : ' seconds'))
  return parts.join(', ')
}

// A tab hidden, or closing: both arrive here, and both should bank.
export function watchVisibility () {
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { pause() } else { resume() }
  })
  window.addEventListener('pagehide', function () { pause() })
}
