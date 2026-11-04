// How long a round runs and how many right answers pass it.
//
// A sublevel (3a, 3b, 3c) deals from three cards. Twenty-seven answers is nine
// turns at each of them, where a whole level's twenty-seven is three turns at
// each of its nine. One row evens that up: three turns each, either way. The
// last column, d, deals from the full deck and keeps the long round.

const BASE_SECONDS = 70
const SHORT_SECONDS = 35

export function isShortLevel (index) {
  const level = String(index || '').toLowerCase()
  if (level.length < 2) { return false }
  return 'abc'.indexOf(level.charAt(1)) > -1
}

// Right answers needed to pass: one row of the dot bar, or all three.
export function roundTarget (index) {
  return isShortLevel(index) ? 9 : 27
}

export function roundSeconds (index) {
  return isShortLevel(index) ? SHORT_SECONDS : BASE_SECONDS
}

// Rounds are not all the same length, so the same share of the clock spent has
// to score the same. Times are scaled back onto the 70 second scale before they
// are stored, which keeps one record per level whether the round was long or
// short, and leaves every score already recorded exactly as it was.
export function scoredTicks (ticks, index) {
  const seconds = roundSeconds(index)
  if (seconds === BASE_SECONDS) { return ticks }
  return Math.round(ticks * BASE_SECONDS / seconds)
}
