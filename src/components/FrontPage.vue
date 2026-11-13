<template>
  <div class="page login-page">
    <div class="front">
      <div class="brand-tile">
        <span class="brand-name">squares</span>
        <span class="brand-sub">math facts</span>
      </div>

      <!-- The field is what the first person sees, and what Add brings back
           for everyone after: once a phone knows a name, choosing one is a
           tap and the keyboard is the wrong thing to lead with. -->
      <div class="front-body" v-if="typing">
        <div class="front-note">Enter your name. It is kept on this device, and the app opens on it next time.</div>
        <input id="name" type="text" autocomplete="off" class="name-field"
               placeholder="Your name" v-model="name"
               @keyup.enter="submit(name)">
        <button type="button" class="front-back" v-if="adding"
                @click="cancel">Back</button>
      </div>

      <div class="front-body" v-else>
        <div class="front-note">Who is playing?</div>

        <!-- Swiping a row aside is how a phone offers to be rid of
             something, and until now the only way to be rid of a name was
             the gear on the menu behind this screen - which is no help at
             all to somebody who has filled the list and has to delete one
             before they can get past it. -->
        <div class="name-row" v-for="person in names" :key="person">
          <button type="button" class="row-delete"
                  :class="{ shown: open === person }"
                  @click="confirming = person">Delete</button>
          <button type="button" class="front-name"
                  :style="{ transform: 'translateX(' + offsetFor(person) + 'px)' }"
                  :class="{ sliding: dragging !== person }"
                  @click="tap(person)"
                  @touchstart="startSwipe(person, $event)"
                  @touchmove="moveSwipe($event)"
                  @touchend="endSwipe(person)"
                  @mousedown="startSwipe(person, $event)">{{person}}</button>
        </div>

        <!-- Drawn as paper rather than as another name, so the names read as
             the list and this reads as the way to lengthen it. -->
        <button type="button" class="front-add" @click="add">+ Add a name</button>

        <!-- Said when it is asked for, rather than standing there as a rule
             about a list most devices never fill. -->
        <div class="front-full" v-if="full">This device keeps {{maxUsers}} names. Swipe one to the left and delete it to make room.</div>
      </div>
    </div>

    <div class="note-veil" v-if="confirming" @click="confirming = null">
      <div class="note-card" @click.stop>
        <div class="note-title">Delete {{confirming}}?</div>
        <div class="note-body">This deletes {{confirming}}&rsquo;s scores as well, and they cannot be got back.</div>
        <div class="settings-confirm-buttons confirm-wide">
          <button type="button" class="settings-keep" @click="confirming = null">Keep</button>
          <button type="button" class="settings-delete" @click="remove(confirming)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// The name screen, which is the whole of signing in. The app keeps whoever
// played last and opens on them, so this screen is only reached the first
// time, or by tapping the name at the top of the operator menu to hand the
// computer to somebody else.
import * as analytics from '../lib/analytics'
import { titleCase, levelsKey, users, deleteUser } from '../lib/name'

// Five is as many as one device has ever needed, and a list that cannot grow
// without end is a list nobody has to scroll.
const MAX_USERS = 5
// How far a row slides to show what is behind it.
const REVEAL = 104

const vm = {
  name: 'frontpage',
  data () {
    return {
      name: '',
      names: users(),
      // Whether the field has been asked for on a device that has names.
      adding: false,
      // Whether someone has just asked for a sixth name.
      full: false,
      // The row swiped open, the one being dragged, and the one being
      // asked about.
      open: null,
      dragging: null,
      confirming: null,
      startX: 0,
      drag: 0,
      swiped: false,
      maxUsers: MAX_USERS
    }
  },
  methods: {
    getRecords (key) {
      const records = JSON.parse(localStorage.getItem(key))
      if (!records) { return }
      Object.keys(records).forEach(k => {
        this.$store.commit('SETPASS', { key: k })
      })
    },
    offsetFor (person) {
      const base = this.open === person ? -REVEAL : 0
      if (this.dragging !== person) { return base }
      return Math.min(0, Math.max(-REVEAL, base + this.drag))
    },
    startSwipe (person, event) {
      const touch = event.touches ? event.touches[0] : event
      this.startX = touch.clientX
      this.dragging = person
      this.drag = 0
      if (!event.touches) {
        // A trackpad drags as well as a finger, and the window has to be
        // listening for it: the pointer leaves the row almost at once.
        this.onMove = e => this.moveSwipe(e)
        this.onUp = () => {
          window.removeEventListener('mousemove', this.onMove)
          window.removeEventListener('mouseup', this.onUp)
          this.endSwipe(person)
        }
        window.addEventListener('mousemove', this.onMove)
        window.addEventListener('mouseup', this.onUp)
      }
    },
    moveSwipe (event) {
      if (!this.dragging) { return }
      const touch = event.touches ? event.touches[0] : event
      this.drag = touch.clientX - this.startX
      // Once it is a swipe rather than a tap, it is this row's to keep.
      if (Math.abs(this.drag) > 10) { event.preventDefault() }
    },
    endSwipe (person) {
      const settled = (this.open === person ? -REVEAL : 0) + this.drag
      const swiped = Math.abs(this.drag) > 10
      this.dragging = null
      this.drag = 0
      if (!swiped) { return }
      this.swiped = true
      this.open = settled < -REVEAL / 2 ? person : null
    },
    // A tap on a name plays as them, unless the row is open, in which case
    // it shuts it again. The click arrives after the swipe has ended, so a
    // swipe has to say so or it would play as whoever was swiped.
    tap (person) {
      if (this.swiped) {
        this.swiped = false
        return
      }
      if (this.dragging) { return }
      if (this.open === person) {
        this.open = null
        return
      }
      this.open = null
      this.submit(person)
    },
    remove (person) {
      deleteUser(person)
      analytics.capture('name deleted')
      this.names = users()
      this.confirming = null
      this.open = null
      this.full = false
      // Deleting whoever the app would have opened on leaves nobody.
      if (titleCase(this.$store.state.username) === person) {
        this.$store.commit('SETUSER', { username: '' })
      }
    },
    add () {
      this.open = null
      if (this.names.length >= MAX_USERS) {
        this.full = true
        return
      }
      this.adding = true
      this.$nextTick(() => {
        const field = document.getElementById('name')
        if (field) { field.focus() }
      })
    },
    cancel () {
      this.adding = false
      this.name = ''
    },
    submit (value) {
      const trimmed = String(value || '').trim()
      if (trimmed.length < 2) { return }
      const titled = titleCase(trimmed)
      // A name already on the list is a choice, not an addition.
      if (this.names.indexOf(titled) === -1 && this.names.length >= MAX_USERS) {
        this.adding = false
        this.full = true
        return
      }
      const previous = this.$store.state.username
      this.$store.commit('SETUSER', { username: titled })
      if (titled !== previous) { analytics.capture('name entered') }
      this.getRecords(levelsKey(trimmed))

      const list = JSON.parse(localStorage.getItem('nameList')) || {}
      if (titled !== trimmed) { delete list[trimmed] }
      list[titled] = 1
      localStorage.setItem('nameList', JSON.stringify(list))

      this.$router.replace('/main/')
    }
  },
  computed: {
    typing () {
      return !this.names.length || this.adding
    }
  },
  mounted () {
    this.names = users()
  }
}

export default vm
</script>

<style lang="sass" scoped>
.front
  width: 278px
  margin: 0 auto
.brand-tile
  box-sizing: border-box
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 10px
  width: 220px
  height: 220px
  margin: 0 auto
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--ink)
  color: var(--tile)
.brand-name
  font-size: 46px
  font-weight: 700
  line-height: 1
.brand-sub
  font-size: 16px
  font-weight: 400
  line-height: 1
.front-body
  margin-top: 20px
.front-note
  margin-bottom: 12px
  color: var(--muted)
  font-size: 16px
  line-height: 1.35
.name-field
  box-sizing: border-box
  width: 100%
  padding: 10px 12px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-family: inherit
  font-size: 22px
  font-weight: 700
  line-height: 1.3
  &::placeholder
    color: var(--muted)
    font-weight: 400
  &:focus
    outline: 3px solid var(--ink)
    outline-offset: 2px
.name-row
  position: relative
  margin-bottom: 10px
.row-delete
  position: absolute
  right: 0
  top: 0
  box-sizing: border-box
  width: 96px
  height: 54px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--miss)
  color: #fff
  font-family: inherit
  font-size: 18px
  font-weight: 700
  opacity: 0
  pointer-events: none
  cursor: pointer
  &.shown
    opacity: 1
    pointer-events: auto
.name-row .front-name
  position: relative
  margin-bottom: 0
  touch-action: pan-y
  &.sliding
    transition: transform 0.18s ease-out
.front-full
  margin-top: 4px
  color: var(--miss)
  font-size: 16px
  line-height: 1.35
.confirm-wide
  margin-top: 14px
.front-name, .front-add
  box-sizing: border-box
  display: block
  width: 100%
  margin-bottom: 10px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  font-family: inherit
  font-weight: 700
  line-height: 1
  cursor: pointer
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.front-name
  height: 54px
  background: var(--answer)
  color: #fff
  font-size: 26px
  overflow: hidden
  white-space: nowrap
.front-add
  height: 50px
  margin-top: 4px
  background: var(--tile)
  color: var(--ink)
  font-size: 20px
.front-back
  margin-top: 12px
  padding: 0
  border: none
  background: transparent
  color: var(--muted)
  font-family: inherit
  font-size: 18px
  font-weight: 700
  cursor: pointer
</style>
