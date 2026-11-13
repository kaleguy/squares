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
        <button type="button" class="front-name" v-for="person in names" :key="person"
                @click="submit(person)">{{person}}</button>
        <!-- Drawn as paper rather than as another name, so the names read as
             the list and this reads as the way to lengthen it. -->
        <button type="button" class="front-add" @click="add">+ Add a name</button>
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
import { titleCase, levelsKey, users } from '../lib/name'

const vm = {
  name: 'frontpage',
  data () {
    return {
      name: '',
      names: users(),
      // Whether the field has been asked for on a device that has names.
      adding: false
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
    add () {
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
