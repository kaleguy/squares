<template>
  <div class="help-page">
    <div class="help-wrap">
      <div class="help-back" @click="back">
        <leftarrow width="40" tight></leftarrow>
      </div>
      <h1>About Squares</h1>
      <p>Squares is a program to memorize basic math facts quickly and efficiently. Each square is one set of facts. You have to answer that set over and over, with no mistakes, in a set amount of time.</p>
      <p>Pass all the squares, and your facts are memorized.</p>

      <section>
        <h2>Colors</h2>
        <p>The gear beside the question mark on the Steps and Grid screen picks a color for the levels you have passed. Night and Chalk darken the whole page.</p>
      </section>

      <section>
        <h2>Your name</h2>
        <p>Type your name and press Return. Squares keeps your scores on this device.</p>
        <shot file="static/help/name.png" caption="The name screen."></shot>
      </section>

      <section>
        <h2>Steps and Grid</h2>
        <p>Steps teaches the facts a small set at a time, and is where to begin if you do not know many of them yet. Grid tests every fact in one sitting, for when you already know most of them. The i on each button says the same thing. Your name above them goes back to the name screen.</p>
        <p>A Grid round puts the whole table on a board, with the operator in the corner and the two runs of numbers along the edges. Every fact comes up once, and each right answer fills that fact's own square. There are four minutes for all of them, and what is left of the clock when the board fills is your score, the same way a level is scored. A wrong answer turns its square red and stops the clock there. The round waits until you answer that fact, and then starts over from an empty board, the same way missing one does in Steps.</p>
      </section>

      <section>
        <h2>The menu</h2>
        <p>The arrow goes back to Steps and Grid. Your name goes back to the name screen. The nine squares are counting. Plus, minus, times, and divide open those facts. The four small squares show how many levels you have passed in those operations, in the same arrangement. Each one shows zero until you pass a level. The four balls are the scores for those same operations. Each ball adds your best score on the levels you have passed, and shows zero until you pass one. A score starts at 70 and counts down, so a faster round is worth more.</p>
        <shot file="static/help/menu.png" caption="The main menu."></shot>
      </section>

      <section>
        <h2>Levels</h2>
        <p>Levels 1 to 4 hold the fewest facts, so each is drilled whole. The rest are grouped by number. The small squares show which facts are in that level. A green square means you passed it. The yellow number in the circle is the score, and the grid behind it shows which facts are in that level. If you try that level again and miss, it is no longer passed.</p>
        <shot file="static/help/levels.png" caption="Picking a level."></shot>
      </section>

      <section>
        <h2>A round</h2>
        <p>The problem is in the big tile. Tap the keypad to answer. Each right answer fills a square along the top. A whole level is three rows, 27 answers in 70 seconds. The a, b and c levels only hold three facts each, so they are one row, 9 answers in 35 seconds. The number on the right counts down from whichever it is, and your score is what is left, measured the same way for both. A wrong answer turns red, moves the switch up, and leaves the answer in place. The practice grid marks that fact with a red dot. Practice from there, or push the switch back down to start over. You can also move the switch yourself to turn the timer off and see the answers. X clears the digits. The arrow goes back. The i opens the facts.</p>
        <shot file="static/help/drill.png" caption="Answering a problem."></shot>
      </section>

      <section>
        <h2>Facts</h2>
        <p>The table shows the whole set for that level. Amber is one number, the color you picked is the level, and green is the answer. A red ring on the level's own row means you got that one wrong recently, so it is being dealt more often until it comes good.</p>
        <p>Under the table the same facts are laid out again. Plus and minus draw each fact as a bar of counters over one row of numbers: read a bar down to that row for the total. Times and divide draw nine rows of the level's own width, numbered straight through, so the number ending each row is that row's multiple. Tapping anywhere goes back to the round.</p>
        <shot file="static/help/facts.png" caption="The fact table."></shot>
      </section>

      <section>
        <h2>Counting</h2>
        <p>Count the pips on the dice and enter the total.</p>
        <shot file="static/help/dice.png" caption="A counting problem."></shot>
      </section>
    </div>
  </div>
</template>

<script>
import LeftArrow from './LeftArrow'

const Shot = {
  name: 'shot',
  props: {
    file: String,
    caption: String
  },
  data () {
    return { missing: false }
  },
  template: '<figure class="shot">' +
    '<img v-if="!missing" :src="file" alt="" @error="missing = true">' +
    '<div v-else class="shot-missing">' +
      '<div>Add a screenshot</div>' +
      '<div class="shot-file">{{file}}</div>' +
    '</div>' +
    '<figcaption>{{caption}}</figcaption>' +
  '</figure>'
}

export default {
  name: 'help',
  components: {
    leftarrow: LeftArrow,
    shot: Shot
  },
  methods: {
    back () {
      if (this.$store.state.username) {
        // Help is opened from the name screen, the choice and the operator
        // menu, so it gives back whichever it came from.
        if (window.history.length > 1) {
          this.$router.back()
        } else {
          this.$router.replace('/home')
        }
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="sass">
@import ../styles/tokens

.help-page
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: safe center
  padding: 28px 18px 56px
  box-sizing: border-box
.help-wrap
  width: 100%
  max-width: 360px
  text-align: left
  color: $ink
.help-back
  width: 40px
  cursor: pointer
  margin-bottom: 16px
  color: $ink
.help-wrap h1
  font-size: 40px
  font-weight: 700
  line-height: 1.1
  margin: 0 0 8px
.help-wrap h2
  font-size: 22px
  font-weight: 700
  line-height: 1.2
  margin: 28px 0 8px
.help-wrap p
  font-size: 18px
  font-weight: 400
  line-height: 1.45
  margin: 0 0 12px
.shot
  margin: 0
.shot img
  display: block
  width: 100%
  background: $tile
  border: 2px solid $ink
  border-radius: 8px
  box-shadow: 0 3px 0 $ink
.shot-missing
  min-height: 168px
  box-sizing: border-box
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 8px
  padding: 20px
  text-align: center
  background: $tile
  color: $ink
  border: 2px dashed $ink
  border-radius: 8px
  font-size: 16px
.shot-file
  font-weight: 700
.shot figcaption
  margin-top: 8px
  font-size: 16px
  line-height: 1.3
</style>
