<template>
  <div class="page">
    <div class="scores-screen">
      <div class="scores-head">
        <button type="button" class="scores-back" @click="menu" aria-label="Back">
          <leftarrow width="46" tight></leftarrow>
        </button>
        <div class="scores-title">Scores</div>
        <div class="scores-spacer"></div>
      </div>

      <div class="stat-row">
        <div class="stat-tile">
          <div class="stat-value">{{levelsWon}}/{{allLevels}}</div>
          <div class="stat-name">Levels</div>
        </div>
        <div class="stat-tile">
          <div class="stat-value">{{pointsWon}}</div>
          <div class="stat-name">Points</div>
        </div>
        <div class="stat-tile">
          <div class="stat-value">{{daysPlayed}}</div>
          <div class="stat-name">Days</div>
        </div>
      </div>

      <!-- Two charts rather than one, because the two questions a record
           answers are different. How much am I getting through is a count of
           days; how much have I done altogether is a line that only goes up. -->
      <div class="tab-row">
        <button type="button" class="tab" :class="{ on: tab === 'levels' }"
                @click="tab = 'levels'">Levels</button>
        <button type="button" class="tab" :class="{ on: tab === 'points' }"
                @click="tab = 'points'">Points</button>
      </div>

      <div class="chart-card">
        <div class="chart-empty" v-if="!series.length">
          <div class="chart-empty-title">Nothing here yet</div>
          <div class="chart-empty-body">Pass a level and it will show up here.</div>
        </div>
        <svg v-else class="chart" viewBox="0 0 320 180" preserveAspectRatio="none">
          <g v-for="line in gridLines" :key="'g' + line.y">
            <line :x1="30" :y1="line.y" :x2="316" :y2="line.y"
                  stroke="var(--track)" stroke-width="1"/>
          </g>
          <template v-if="tab === 'levels'">
            <rect v-for="point in points" :key="point.key"
                  :x="point.x - 5" :y="point.y" width="10" :height="150 - point.y"
                  rx="3" fill="var(--answer)"/>
          </template>
          <template v-else>
            <polygon :points="areaPoints" fill="var(--answer)" opacity="0.22"/>
            <polyline :points="linePoints" fill="none" stroke="var(--answer)"
                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </template>
        </svg>
        <div class="chart-axis" v-if="series.length">
          <span v-for="label in axisLabels" :key="label.at"
                :style="{ left: label.at + 'px' }">{{label.text}}</span>
        </div>
      </div>

      <div class="chart-caption">{{caption}}</div>
    </div>
  </div>
</template>

<script>
// Where the levels passed and the points earned are read: the chart circle on
// the operator menu opens it.
//
// The menus say how far through a table you are - nine squares on the sign,
// nine tiles behind it - and that is as much as a menu should say. This is
// the other half: what has happened over the days.
import LeftArrow from './LeftArrow'
import { titleCase, levelsKey } from '../lib/name'
import { gridRecords } from '../lib/grid'
import { MENU_LEVELS, OPERATORS } from '../lib/levels'
import { ROUND_SECONDS } from '../lib/round'

const GRID_SECONDS = 200
const DAY = 24 * 60 * 60 * 1000
const CHART_LEFT = 30
const CHART_RIGHT = 316
const CHART_TOP = 20
const CHART_BOTTOM = 150

// Which keys the thirty-six are. A record can hold more - a level 1, or a
// third of a level, from before either came off the menu - and counting those
// put the tally past its own total and the bars above what the menus show.
const WINNABLE = {}
OPERATORS.forEach(function (op) {
  MENU_LEVELS.forEach(function (level) { WINNABLE[op.id + level] = true })
  WINNABLE[op.id + ' all'] = true
})

function dayOf (stamp) {
  const parts = String(stamp).substring(0, 10).split('-')
  return Date.UTC(+parts[0], +parts[1] - 1, +parts[2])
}

const vm = {
  name: 'scores',
  components: {
    leftarrow: LeftArrow
  },
  data () {
    return {
      tab: 'levels'
    }
  },
  methods: {
    menu () {
      this.$router.replace('/main/')
    }
  },
  computed: {
    // Every passing round in the record, oldest first. A level's rounds are
    // worth 70 at most and a whole table's 200, so each is scored against the
    // clock it was given.
    rounds () {
      const username = this.$store.state.username
      const all = []
      const collect = function (records, base, suffix) {
        Object.keys(records || {}).forEach(function (key) {
          const times = records[key] || {}
          Object.keys(times).forEach(function (stamp) {
            all.push({
              stamp: stamp,
              day: dayOf(stamp),
              key: key + suffix,
              points: Math.max(0, base - times[stamp])
            })
          })
        })
      }
      collect(JSON.parse(localStorage.getItem(levelsKey(username))) || {}, ROUND_SECONDS, '')
      collect(gridRecords(username), GRID_SECONDS, ' all')
      return all.sort(function (a, b) { return a.stamp < b.stamp ? -1 : 1 })
    },
    // The day each thing was won, counted: a level counts once, however many
    // times it has been passed since.
    levelsPerDay () {
      const firstSeen = {}
      this.rounds.forEach(function (round) {
        if (!WINNABLE[round.key] || firstSeen[round.key]) { return }
        firstSeen[round.key] = round.day
      })
      const byDay = {}
      Object.keys(firstSeen).forEach(function (key) {
        byDay[firstSeen[key]] = (byDay[firstSeen[key]] || 0) + 1
      })
      return Object.keys(byDay).sort().map(function (day) {
        return { day: +day, value: byDay[day] }
      })
    },
    // The running total, one reading per day: where it stood at the end of
    // each day anything was won.
    pointsPerDay () {
      let total = 0
      const byDay = {}
      this.rounds.forEach(function (round) {
        total += round.points
        byDay[round.day] = total
      })
      return Object.keys(byDay).sort().map(function (day) {
        return { day: +day, value: byDay[day] }
      })
    },
    series () {
      return this.tab === 'levels' ? this.levelsPerDay : this.pointsPerDay
    },
    allLevels () {
      return OPERATORS.length * (MENU_LEVELS.length + 1)
    },
    levelsWon () {
      const seen = {}
      this.rounds.forEach(function (round) {
        if (WINNABLE[round.key]) { seen[round.key] = true }
      })
      return Object.keys(seen).length
    },
    pointsWon () {
      const days = this.pointsPerDay
      return days.length ? days[days.length - 1].value : 0
    },
    daysPlayed () {
      const seen = {}
      this.rounds.forEach(function (round) { seen[round.day] = true })
      return Object.keys(seen).length
    },
    // A fortnight at least, so one day's work is a mark on a chart rather
    // than a chart of its own.
    domain () {
      const first = this.series.length ? this.series[0].day : Date.now()
      const last = this.series.length ? this.series[this.series.length - 1].day : first
      const end = Math.max(last, first + 13 * DAY)
      return { from: first - DAY / 2, to: end + DAY / 2 }
    },
    top () {
      const highest = this.series.reduce(function (max, day) {
        return Math.max(max, day.value)
      }, 0)
      if (this.tab === 'levels') { return Math.max(4, highest) }
      const step = Math.pow(10, String(Math.max(10, highest)).length - 1)
      return Math.max(step, Math.ceil(highest / step) * step)
    },
    points () {
      const me = this
      const span = this.domain.to - this.domain.from
      return this.series.map(function (day) {
        return {
          key: day.day,
          x: CHART_LEFT + (day.day - me.domain.from) / span * (CHART_RIGHT - CHART_LEFT),
          y: CHART_BOTTOM - (day.value / me.top) * (CHART_BOTTOM - CHART_TOP)
        }
      })
    },
    linePoints () {
      return this.points.map(function (p) { return p.x + ',' + p.y }).join(' ')
    },
    areaPoints () {
      if (!this.points.length) { return '' }
      const first = this.points[0]
      const last = this.points[this.points.length - 1]
      return first.x + ',' + CHART_BOTTOM + ' ' + this.linePoints + ' ' +
        last.x + ',' + CHART_BOTTOM
    },
    gridLines () {
      const lines = []
      for (let i = 0; i <= 4; i++) {
        lines.push({ y: CHART_BOTTOM - i * (CHART_BOTTOM - CHART_TOP) / 4 })
      }
      return lines
    },
    axisLabels () {
      const span = this.domain.to - this.domain.from
      const me = this
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return [0.1, 0.5, 0.9].map(function (share) {
        const at = me.domain.from + span * share
        const date = new Date(at)
        return {
          at: CHART_LEFT + share * (CHART_RIGHT - CHART_LEFT),
          text: months[date.getUTCMonth()] + ' ' + date.getUTCDate()
        }
      })
    },
    caption () {
      return this.tab === 'levels'
        ? 'Levels won for the first time, by the day they were won.'
        : 'Every round that passed, adding up. A faster round is worth more.'
    },
    username () {
      return titleCase(this.$store.state.username)
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
  }
}

export default vm
</script>

<style lang="sass" scoped>
.scores-screen
  width: 340px
  margin: 0 auto
.scores-head
  display: flex
  align-items: center
  margin-bottom: 14px
.scores-back, .scores-spacer
  display: flex
  align-items: center
  justify-content: center
  width: 46px
  height: 44px
  padding: 0
  border: none
  background: transparent
  color: var(--ink)
  cursor: pointer
  DIV
    display: flex
    line-height: 0
.scores-spacer
  cursor: default
.scores-title
  flex: 1
  font-size: 30px
  font-weight: 700
  line-height: 1
.stat-row
  display: flex
  gap: 10px
  margin-bottom: 14px
.stat-tile
  box-sizing: border-box
  flex: 1
  padding: 12px 4px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
.stat-value
  font-size: 26px
  font-weight: 700
  line-height: 1
  white-space: nowrap
.stat-name
  margin-top: 6px
  color: var(--muted)
  font-size: 14px
  line-height: 1
.tab-row
  display: flex
  gap: 10px
  margin-bottom: 14px
.tab
  box-sizing: border-box
  flex: 1
  height: 44px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-family: inherit
  font-size: 20px
  font-weight: 700
  cursor: pointer
  &.on
    background: var(--answer)
    color: #fff
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.chart-card
  box-sizing: border-box
  padding: 10px 2px 4px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
.chart
  display: block
  width: 100%
  height: 180px
.chart-axis
  position: relative
  height: 18px
  SPAN
    position: absolute
    transform: translateX(-50%)
    color: var(--muted)
    font-size: 12px
    white-space: nowrap
.chart-empty
  padding: 46px 16px
.chart-empty-title
  font-size: 22px
  font-weight: 700
.chart-empty-body
  margin-top: 8px
  color: var(--muted)
  font-size: 16px
.chart-caption
  margin-top: 12px
  color: var(--muted)
  font-size: 14px
  line-height: 1.4
</style>
