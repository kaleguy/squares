const LIGHT = {
  paper: '#E8EEF6',
  ink: '#1A2744',
  tile: '#FFFFFF',
  line: '#1A2744',
  lip: '#1A2744',
  operand: '#F0B429',
  answer: '#1C7A45',
  miss: '#C4362C',
  markOn: '#1C7A45',
  grid: 'rgba(26, 39, 68, 0.055)',
  muted: '#8B97AD',
  track: '#B7C3D6'
}

export const THEMES = [
  {
    id: 'pine',
    label: 'Pine',
    level: '#1B4D38',
    levelText: '#FFFFFF'
  },
  {
    id: 'ink',
    label: 'Ink',
    // A lighter, more saturated ink-blue. Matching the page ink exactly left
    // the level colour invisible wherever the two sat together.
    level: '#2F5496',
    levelText: '#FFFFFF'
  },
  {
    id: 'ochre',
    label: 'Ochre',
    // Deepened from #C4841A, which sat at 2.7:1 on the paper. No mid gold
    // clears both the paper and its own text, so it goes dark with white text.
    level: '#96680F',
    levelText: '#FFFFFF'
  },
  {
    id: 'blue',
    label: 'Blue',
    // Deep enough to read against the paper and the tiles; the old pale blue
    // sat at 1.1:1 on both. Leans cyan to stay clear of Ink's navy.
    level: '#1F6E8C',
    levelText: '#FFFFFF'
  },
  {
    id: 'night',
    label: 'Night',
    paper: '#141C2B',
    ink: '#E7EEF6',
    tile: '#243044',
    line: '#D5DEEA',
    lip: '#070B12',
    answer: '#1C7A45',
    miss: '#FF8A82',
    markOn: '#7DCEA0',
    grid: 'rgba(231, 238, 246, 0.07)',
    muted: '#93A0B5',
    track: '#3A465C',
    level: '#A9C4F2',
    levelText: '#141C2B'
  },
  {
    id: 'chalk',
    label: 'Chalk',
    paper: '#12211B',
    ink: '#F4F0E4',
    tile: '#1C3328',
    line: '#E6E0D0',
    lip: '#070E0B',
    answer: '#1C7A45',
    miss: '#FF8A82',
    markOn: '#8FCBAA',
    grid: 'rgba(244, 240, 228, 0.07)',
    muted: '#A8B5A4',
    track: '#2C463A',
    // Coloured chalk. Matching the page ink exactly left the level colour
    // invisible wherever the two sat together.
    level: '#C98FC4',
    levelText: '#12211B'
  }
]

const KEY = 'squares-theme'
const DEFAULT_ID = 'chalk'

export function themeById (id) {
  return THEMES.find(function (theme) { return theme.id === id }) || THEMES.find(function (theme) { return theme.id === DEFAULT_ID })
}

export function currentThemeId () {
  try {
    return themeById(localStorage.getItem(KEY)).id
  } catch (e) {
    return DEFAULT_ID
  }
}

export function applyTheme (id) {
  const theme = Object.assign({}, LIGHT, themeById(id))
  const root = document.documentElement
  const vars = {
    '--paper': theme.paper,
    '--ink': theme.ink,
    '--tile': theme.tile,
    '--line': theme.line,
    '--lip': theme.lip,
    '--operand': theme.operand,
    '--answer': theme.answer,
    '--miss': theme.miss,
    '--mark-on': theme.markOn,
    '--grid': theme.grid,
    '--muted': theme.muted,
    '--track': theme.track,
    '--level': theme.level,
    '--level-text': theme.levelText
  }
  Object.keys(vars).forEach(function (name) {
    root.style.setProperty(name, vars[name])
  })
  try {
    localStorage.setItem(KEY, themeById(id).id)
  } catch (e) {}
  return themeById(id).id
}
