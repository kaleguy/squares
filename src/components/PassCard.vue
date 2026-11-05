<template>
  <div class="pass-veil">
    <div class="pass-card">
      <div class="pass-title">{{title}}</div>
      <div class="pass-score">{{score}}</div>
      <div class="pass-best" v-if="isBest">Your best yet</div>
      <div class="pass-detail">{{detail}}</div>
      <div class="pass-buttons">
        <button type="button" class="pass-button pass-again"
                v-if="again" @click="$emit('again')">{{again}}</button>
        <button type="button" class="pass-button pass-done"
                :class="{ 'is-wide': !again }" @click="$emit('done')">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
// What a passed round says. This was a browser alert, which arrives wearing
// the system's clothes rather than the app's and says only that something
// good happened. This says what was done and what it scored, in the app's own
// hand, with the score drawn the way scores are drawn everywhere else here.
const vm = {
  name: 'passcard',
  props: {
    title: String,
    score: Number,
    detail: String,
    isBest: Boolean,
    // Another go at the same thing, where that makes sense.
    again: { default: null }
  }
}

export default vm
</script>

<style lang="sass">
.pass-veil
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
  background: rgba(0, 0, 0, 0.45)
  z-index: 30
.pass-card
  box-sizing: border-box
  width: 290px
  padding: 26px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  text-align: center
.pass-title
  font-size: 30px
  font-weight: 700
  line-height: 1
.pass-score
  display: flex
  align-items: center
  justify-content: center
  width: 104px
  height: 104px
  margin: 14px auto 0
  border-radius: 50%
  background: var(--answer)
  color: #fff
  font-size: 46px
  font-weight: 700
  line-height: 1
.pass-best
  margin-top: 14px
  color: var(--answer)
  font-size: 17px
  font-weight: 700
.pass-detail
  margin-top: 14px
  color: var(--muted)
  font-size: 16px
.pass-buttons
  display: flex
  justify-content: center
  gap: 10px
  margin-top: 18px
.pass-button
  box-sizing: border-box
  width: 108px
  height: 48px
  padding: 0
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  font-family: inherit
  font-size: 20px
  font-weight: 700
  line-height: 1
  cursor: pointer
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
  &.is-wide
    width: 150px
.pass-again
  background: var(--tile)
  color: var(--ink)
.pass-done
  background: var(--ink)
  color: var(--tile)
</style>
