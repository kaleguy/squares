<template>
  <div class="help-page">
    <div class="help-wrap">
      <div class="help-back" @click="back">
        <leftarrow width="40" tight></leftarrow>
      </div>

      <h1>Squares</h1>
      <p class="help-lead">Memorize basic math facts quickly</p>
      <p>This app emphasizes speed and accuracy of practice.</p>
      <p>Answer a set of problems without making a mistake in a set interval. A mistake restarts the interval.</p>
      <p>Pass all of the sets and the facts are there for instant recall.</p>

      <section>
        <h2>The menu</h2>
        <p>The four signs are the four tables. Behind each sign, nine squares count what has been won in that table: the eight levels and the whole table, laid out the way the level menu under it is. Your own name opens the name screen, for handing the computer to somebody else. The chart opens your scores, and the gear sets the colours and keeps the names.</p>
        <shot file="static/help/menu.jpg" caption="The menu."></shot>
      </section>

      <section>
        <h2>Levels</h2>
        <p>A sign opens nine tiles. Eight of them are levels, 2 to 9, and each is the whole of that number&rsquo;s facts. One is left out, since adding, taking away, multiplying or dividing by one is already in the number itself. The ninth, marked all, is the whole table in one sitting. A tile turns green once it has been won.</p>
        <p>The clock in the corner is how long this table has had altogether: rounds, fact tables, and the time spent looking at the menu. It is kept under the name that is playing, so two people sharing a browser keep separate clocks.</p>
        <shot file="static/help/levels.jpg" caption="A table&rsquo;s nine tiles."></shot>
      </section>

      <section>
        <h2>A round</h2>
        <p>Twenty-seven answers, no mistakes, in seventy seconds. Each right answer fills a square along the top, and the bar under the squares is the clock running down.</p>
        <p>A wrong answer turns the problem red and ends the run: answer it correctly to carry on, and the squares and the clock start again from the top. That fact comes round more often afterwards, until it sticks.</p>
        <p>The boxes beside the problem are the clock and your last two scores at this level. Touch them and the app says what a score is: whatever is left of the clock when the round is finished, so a faster round is worth more. The arrow goes back, the switch turns the clock off, and the i opens the facts.</p>
        <shot file="static/help/drill.jpg" caption="Answering a problem."></shot>
      </section>

      <section>
        <h2>Practice</h2>
        <p>With the switch over, nothing is timed and nothing is scored, and the screen says so at the top. The level&rsquo;s own facts are listed above the problem, and the dots mark the ones you have been missing lately.</p>
        <shot file="static/help/practice.jpg" caption="The same level, untimed."></shot>
      </section>

      <section>
        <h2>The whole table</h2>
        <p>The all tile deals every fact in the table once, against a clock of three minutes and twenty. Each right answer fills that fact&rsquo;s own square on the board. A wrong one turns its square red and holds the run there until it is answered, and then the board starts over empty.</p>
        <p>Filling the board scores the way a level does, counting down from the clock it was given, and its best is kept apart from the levels&rsquo;: a whole table at once is not the same feat as a level. The switch beside the board drills what has been missed lately instead, each fact both ways round.</p>
        <shot file="static/help/grid.jpg" caption="The whole table."></shot>
      </section>

      <section>
        <h2>Facts</h2>
        <p>The table holds the whole set for that level. Amber is one number, the colour you picked is the level, and green is the answer. A red ring on the level&rsquo;s own row means you missed that fact recently, so it comes round more often until it sticks.</p>
        <p>The same facts are laid out again underneath. Plus and minus draw each one as a bar of counters over a row of numbers: read a bar down to that row for the total. Times and divide draw nine rows of the level&rsquo;s own width, numbered straight through, so each row ends on its multiple. Tap anywhere to go back.</p>
        <shot file="static/help/facts.jpg" caption="The fact table."></shot>
      </section>

      <section>
        <h2>Scores</h2>
        <p>The chart on the menu keeps the record: levels won out of thirty-six, points earned, and days played, over a chart with two tabs. Levels counts each one on the day it was first won, so it says how much is getting done. Points is the running total of every round that passed, and only goes up.</p>
        <shot file="static/help/scores.jpg" caption="The record over the days."></shot>
      </section>

      <section>
        <h2>What is kept, and where</h2>
        <p>Every name and every score stays in this browser, on this device. Nothing is sent anywhere and there is no account to make: a name is the whole of signing in, and the app opens on whoever played last.</p>
        <p>Five names is as many as it keeps. To make room for another, swipe a name to the left on the name screen and delete it &mdash; which deletes that name&rsquo;s scores with it.</p>
      </section>

      <!-- The page is long, and the way out was only at the top of it:
           reading to the end meant scrolling all the way back up to leave. -->
      <div class="help-back help-back-end" @click="back">
        <leftarrow width="40" tight></leftarrow>
      </div>

      <div class="help-credit">
        <div>&copy; Joseph Orr</div>
        <a href="https://www.trilog.app" target="_blank" rel="noopener">www.trilog.app</a>
      </div>
    </div>
  </div>
</template>

<script>
// One page, behind the question mark on the menu, read top to bottom the way
// the app is used. It was two for a while - Steps on one, Grid on the other -
// because a screen above them asked which you wanted before it would show you
// anything. That screen is gone: there is one way in, the signs, and the whole
// table is a tile on the level menu like any other.
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
  // A missing image takes its caption with it rather than leaving an empty
  // slot: an unfilled slot on a help page reads as an unfinished app.
  template: '<figure class="shot" v-if="!missing">' +
    '<img :src="file" alt="" @error="missing = true">' +
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
      // One page now, and the menu is the only thing that opens it.
      this.$router.replace(this.$store.state.username ? '/main/' : '/')
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
.help-back-end
  margin-top: 20px
  margin-bottom: 0
.help-wrap h1
  font-size: 40px
  font-weight: 700
  line-height: 1.1
  margin: 0 0 2px
.help-lead
  font-size: 20px
  font-weight: 700
  line-height: 1.3
  margin: 0 0 14px
.help-wrap h2
  font-size: 22px
  font-weight: 700
  line-height: 1.2
  margin: 28px 0 8px
.help-wrap p
  font-size: 18px
  font-weight: 400
  // 22 over 18. The default leading set the lines nearly as far apart as
  // the paragraphs, and a page that is nothing but text read as one block.
  line-height: 22px
  margin: 0 0 16px
.shot
  margin: 0
.shot img
  display: block
  width: 100%
  background: $tile
  border: 2px solid $ink
  border-radius: 8px
  box-shadow: 0 3px 0 $ink
.shot figcaption
  margin-top: 8px
  font-size: 16px
  line-height: 1.3
.help-credit
  margin-top: 32px
  font-size: 14px
  line-height: 1.5
  A
    // The score green is too close to the paper in the dark themes; a
    // mark's green reads on all six.
    color: var(--mark-on)
    text-decoration: none
</style>
