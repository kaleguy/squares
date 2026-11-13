// How long a round runs and how many right answers pass it.
//
// One shape, since the thirds came off the level menu: every level is the
// whole of its nine facts, three turns at each of them, against the same
// clock. The iOS app keeps a longer clock for spoken answers and scales the
// time back onto this one; there is no microphone here, so there is nothing
// to scale.

export const ROUND_SECONDS = 70

// Right answers needed to pass: all three rows of the dot bar.
export const ROUND_TARGET = 27
