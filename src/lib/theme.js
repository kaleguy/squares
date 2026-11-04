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
  markOff: '#C8890E',
  grid: 'rgba(26, 39, 68, 0.055)',
  muted: '#8B97AD',
  track: '#B7C3D6'
}

export const THEMES = [
  {
    id: 'pine',
    label: 'Pine',
    level: '#1B4D38',
    levelText: '#FFFFFF',
    dotOn: '#FFFFFF',
    dotOff: '#F0C36A'
  },
  {
    id: 'ink',
    label: 'Ink',
    level: '#1A2744',
    levelText: '#FFFFFF',
    dotOn: '#FFFFFF',
    dotOff: '#F0C36A'
  },
  {
    id: 'ochre',
    label: 'Ochre',
    level: '#C4841A',
    levelText: '#1A2744',
    dotOn: '#1A2744',
    dotOff: '#FFFFFF'
  },
  {
    id: 'blue',
    label: 'Blue',
    level: '#D7E3F2',
    levelText: '#1A2744',
    dotOn: '#1C7A45',
    dotOff: '#C8890E'
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
    markOff: '#F0C36A',
    grid: 'rgba(231, 238, 246, 0.07)',
    muted: '#93A0B5',
    track: '#3A465C',
    level: '#A9C4F2',
    levelText: '#141C2B',
    dotOn: '#141C2B',
    dotOff: '#C4841A'
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
    markOff: '#F0C36A',
    grid: 'rgba(244, 240, 228, 0.07)',
    muted: '#A8B5A4',
    track: '#2C463A',
    level: '#F4F0E4',
    levelText: '#12211B',
    dotOn: '#1C7A45',
    dotOff: '#C4841A'
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
    '--mark-off': theme.markOff,
    '--grid': theme.grid,
    '--muted': theme.muted,
    '--track': theme.track,
    '--level': theme.level,
    '--level-text': theme.levelText,
    '--passed-dot-on': theme.dotOn,
    '--passed-dot-off': theme.dotOff
  }
  Object.keys(vars).forEach(function (name) {
    root.style.setProperty(name, vars[name])
  })
  try {
    localStorage.setItem(KEY, themeById(id).id)
  } catch (e) {}
  return themeById(id).id
}
