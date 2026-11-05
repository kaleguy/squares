<template>
  <div class="numpad" @click="getNum">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div class="back" @click="$emit('back')">
      <leftarrow width="40" tight></leftarrow>
    </div>
    <div>0</div>
    <div class="del">
      <xicon width="50" style="margin-top:5px"></xicon>
    </div>
  </div>
</template>

<script>
  // The ten digits, a way out and a way to clear, with no idea what it is
  // answering. Steps and Grid press the same keys.
  import LeftArrow from './LeftArrow'
  import X from './X'

  const vm = {
    name: 'keypad',
    components: {
      leftarrow: LeftArrow,
      xicon: X
    },
    methods: {
      keyFromEvent: function (e) {
        let el = e.target
        if (el !== this.$el && el.closest) {
          const key = el.closest('.numpad > div')
          if (key) return key
        }
        // Rounded corners and the press lip sit outside the key, so a click
        // there hits the pad. Count it as the nearest key.
        const x = e.clientX
        const y = e.clientY
        let best = null
        let bestD = 64
        Array.from(this.$el.children).forEach(key => {
          const r = key.getBoundingClientRect()
          const cx = Math.min(Math.max(x, r.left), r.right)
          const cy = Math.min(Math.max(y, r.top), r.bottom)
          const d = (x - cx) * (x - cx) + (y - cy) * (y - cy)
          if (d < bestD) {
            bestD = d
            best = key
          }
        })
        return best
      },
      getNum: function (e) {
        const el = this.keyFromEvent(e)
        if (!el) return
        if (el.classList.contains('back')) {
          if (e.target === this.$el) this.$emit('back')
          return
        }
        const num = (el.innerText || '').trim()
        if (!/^[0-9]$/.test(num)) {
          return this.$emit('clear')
        }
        return this.$emit('digit', num)
      }
    }
  }

  export default vm
</script>

<style lang="sass">
  $button-size: 3em
  .fa-icon
    width: auto
    height: 1em
  /* or any other relative font sizes */
  .eq-button
    line-height: .8
  .eq
    font-size: 1.2em
    font-weight: bold
    line-height: .5em
  .numpad
    font-size: 4em
    font-weight: bold
    display: flex
    flex-direction: row
    flex-flow: row wrap
    width: 4.2em
    margin-left: auto
    margin-right: auto
    border: 0px solid #ccc
    border-radius: 6px
    DIV
      width: 1em
      border: 2px solid var(--line)
      border-radius: 8px
      background-color: var(--tile)
      color: var(--ink)
      box-shadow: 0 3px 0 var(--lip)
      margin: 2px
      padding: 8px
      line-height: 1
      height: .9em
      cursor: pointer
      font-weight: 700
      user-select: none
      &:active
        transform: translateY(2px)
        box-shadow: 0 1px 0 var(--lip)
    DIV DIV
      border: none
      box-shadow: none
      background-color: transparent
      width: auto
      height: auto
      margin: 0
      padding: 0
      line-height: 0
      &:active
        transform: none
    // Leaving and clearing are not answers, so they wear no tile at all:
    // only the ten digits read as keys to press. The border stays, turned
    // transparent, so the bottom row still lines up with the rows above.
    .back, .del
      border-color: transparent
      background-color: transparent
      box-shadow: none
      &:active
        box-shadow: none
    .del
      color: var(--miss)
      font-size: 40px
      line-height: 1.8
      height: 57px
      width: 64px
      display: block
    .back
      display: flex
      align-items: center
      justify-content: center
      width: 64px
      height: 57px
      color: var(--ink)
      font-size: 40px
      line-height: 1
</style>
