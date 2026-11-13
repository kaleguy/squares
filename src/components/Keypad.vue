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
    <!-- The corner the way out used to take. It is up beside the problem
         now, with the switch and the facts, which leaves the keypad to the
         things that are about what is being typed. On the iOS app this
         corner holds the microphone; there is no microphone here. -->
    <div class="blank"></div>
    <div>0</div>
    <!-- The usual backspace, not the cross this key used to wear: a cross
         beside the times table reads as a times sign, and this key is
         nothing of the sort. -->
    <div class="del" aria-label="Delete">
      <svg viewBox="0 0 28 20" aria-hidden="true">
        <path fill="var(--miss)"
              d="M10.4 1.6 Q11.2 1 12.2 1 H24.4 Q27 1 27 3.6 V16.4 Q27 19 24.4 19 H12.2
                 Q11.2 19 10.4 18.4 L2.1 11.4 Q1 10.4 1 10 Q1 9.6 2.1 8.6 Z"/>
        <g stroke="var(--paper)" stroke-width="2.4" stroke-linecap="round">
          <line x1="15.4" y1="6.6" x2="22.2" y2="13.4"/>
          <line x1="22.2" y1="6.6" x2="15.4" y2="13.4"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  // The ten digits and a way to rub one out, with no idea what it is
  // answering. A level and the whole table press the same keys.
  const vm = {
    name: 'keypad',
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
        if (el.classList.contains('blank')) return
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
  // The keys take the room the way out and the spoken-answer bar used to
  // take between them.
  .numpad
    display: grid
    grid-template-columns: repeat(3, 100px)
    gap: 4px
    justify-content: center
    width: 308px
    margin: 0 auto
    DIV
      box-sizing: border-box
      display: flex
      align-items: center
      justify-content: center
      height: 92px
      border: 2px solid var(--line)
      border-radius: 8px
      background-color: var(--tile)
      color: var(--ink)
      box-shadow: 0 3px 0 var(--lip)
      font-size: 76px
      font-weight: 700
      line-height: 1
      cursor: pointer
      user-select: none
      &:active
        transform: translateY(2px)
        box-shadow: 0 1px 0 var(--lip)
    // Rubbing an answer out is not an answer, so it wears no tile: only the
    // ten digits read as keys to press.
    .del, .blank
      border-color: transparent
      background-color: transparent
      box-shadow: none
      &:active
        transform: none
        box-shadow: none
    .blank
      cursor: default
    .del svg
      display: block
      width: 46px
      height: 33px
</style>
