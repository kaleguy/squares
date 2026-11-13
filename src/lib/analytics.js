// What the app says about itself, and nothing about who is using it.
//
// The twin of Analytics.swift in the iOS port, deliberately so: the same
// event names, the same screen names, the same properties, into the same
// PostHog project. The only addition is `platform`, so a chart can tell the
// two apart without needing two charts.
//
// A name typed on the front page lets the browser keep one person's scores
// apart from another's. That name, and everything kept under it, stays in
// localStorage: it is never sent as a property, never sent as a person,
// never used as an id. What goes out is the shape of the app's use.
//
// Nor is a profile built from it. `person_profiles` is 'identified_only' and
// nothing here ever identifies anyone, so every event arrives under a random
// id this browser made for itself and there is no person on the other end for
// anything to accumulate against.

// The project API key. It is a write-only key, public by design: it can send
// events and read feature flags, and can read no data back out. It sits in
// the page source of every visit, so there is nothing to hide here.
const TOKEN = 'phc_tzz8rgUvPpohzXD8VBMUn82u5dPDQCh7WzdsJLiwLELt'
const API_HOST = 'https://us.i.posthog.com'
const ASSET_HOST = 'https://us-assets.i.posthog.com'

// Events captured before the library finishes loading wait here rather than
// being dropped. The front page is reached before any script of this size
// can load, and "name entered" is the first interesting thing that happens.
let pending = []
let loading = false

function live () {
  return window.posthog && window.posthog.__loaded ? window.posthog : null
}

function flush () {
  const ph = live()
  if (!ph) { return }
  pending.forEach(function (item) { send(item.event, item.props) })
  pending = []
}

function send (event, props) {
  const ph = live()
  if (!ph) { return }
  ph.capture(event, props)
}

export function start () {
  if (loading || live()) { return }
  loading = true
  const script = document.createElement('script')
  script.src = ASSET_HOST + '/static/array.js'
  script.async = true
  script.onload = function () {
    if (!window.posthog || typeof window.posthog.init !== 'function') { return }
    window.posthog.init(TOKEN, {
      api_host: API_HOST,
      // The screens are named from the router below, where the app's own
      // routing already knows which one is which. Guessing from the DOM would
      // only ever report one page.
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      // Nothing here is recorded or replayed.
      disable_session_recording: true,
      // Nobody is identified, so there is nobody to profile.
      person_profiles: 'identified_only',
      // There is no switch in this app yet, so the browser's own setting is
      // the only thing anyone can say with, and it is honoured.
      respect_dnt: true,
      loaded: function () {
        // The mobile SDK sends this of its own accord on a cold launch. Sent
        // here by hand so one funnel can count openings from both apps.
        send('Application Opened', { platform: 'web' })
        flush()
      }
    })
  }
  script.onerror = function () { pending = [] }
  document.head.appendChild(script)
}

export function capture (event, props) {
  const payload = Object.assign({ platform: 'web' }, props || {})
  if (live()) {
    send(event, payload)
  } else if (pending.length < 50) {
    pending.push({ event: event, props: payload })
  }
}

/// A screen opened. The operator and the level ride along, because which
/// table someone is stuck on is the whole question.
export function screen (name, props) {
  // `$screen` rather than `$pageview`: the iOS app reports screens under this
  // name, and matching it means one chart covers both apps instead of two
  // charts covering half each.
  capture('$screen', Object.assign({ $screen_name: name }, props || {}))
}

// The same names Store.replace gives these screens on iOS.
export function describe (route) {
  const parts = String(route.path || '').split('/').filter(Boolean)
  const op = route.params && route.params.operator
  const level = route.params && route.params.level
  switch (parts[0]) {
    case undefined: return ['name', {}]
    case 'home': return ['steps or grid', {}]
    case 'grid': return ['grid menu', {}]
    case 'gridcard': return ['grid round', { operator: op }]
    case 'gridfacts': return ['grid answers', { operator: op }]
    case 'main': return ['operator menu', {}]
    case 'help': return ['help', {}]
    case 'menu': return ['level menu', { operator: op }]
    case 'card': return ['card', { operator: op, level: level }]
    case 'facts': return ['fact list', { operator: op, level: level }]
    case 'chart': return ['chart', { chart: route.params.type }]
    default: return [parts[0], {}]
  }
}

export function screenFor (route) {
  const named = describe(route)
  screen(named[0], named[1])
}
