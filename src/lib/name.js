export function titleCase (value) {
  return String(value || '').replace(/\S+/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
}

// Scores are stored under the title-cased name. Copy a record saved
// under the earlier casing the first time that name is used.
export function levelsKey (name) {
  const raw = String(name || '')
  const titled = titleCase(raw)
  const next = titled + '_levels'
  const prev = raw + '_levels'
  if (next !== prev && !localStorage.getItem(next) && localStorage.getItem(prev)) {
    localStorage.setItem(next, localStorage.getItem(prev))
  }
  return next
}
