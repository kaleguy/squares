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

// Everyone this device has kept anything for, title-cased, in order.
export function users () {
  const list = JSON.parse(localStorage.getItem('nameList')) || {}
  const seen = {}
  return Object.keys(list).map(titleCase).filter(function (name) {
    if (seen[name]) { return false }
    seen[name] = true
    return true
  }).sort()
}

// A name and everything kept under it: the scores, the fact weights, the Grid
// bests and the Grid misses, under the title-cased key and under whatever
// casing the name was first typed in.
export function deleteUser (name) {
  const titled = titleCase(name)
  const list = JSON.parse(localStorage.getItem('nameList')) || {}
  const bases = {}
  bases[titled] = true
  bases[name] = true
  Object.keys(list).forEach(function (key) {
    if (titleCase(key) !== titled) { return }
    bases[key] = true
    delete list[key]
  })
  localStorage.setItem('nameList', JSON.stringify(list))
  Object.keys(bases).forEach(function (base) {
    ;['_levels', '_facts', '_grid', '_gridmiss'].forEach(function (suffix) {
      localStorage.removeItem(base + suffix)
    })
  })
}
