import { Line } from 'vue-chartjs'
import _ from 'lodash'
import moment from 'moment'

const dummyData = {
  '+1': { '2017-09-20-46-29': 49 },
  '+2': { '2017-09-22-51-06': 28 },
  '-1': { '2017-09-23-50-28': 36 },
  '+3': { '2017-09-23-50-28': 36 },
  '+4': { '2017-09-25-50-28': 36 }
}

let yMax = 50 // max levels

function normalizeData (data, type) {
  // const normalized = []
  if (!data) {
    let d = moment()
    data = []
    data[0] = {x: d, y: 0}
    return data
  }
  const values = Object.values(data)
  const crushed = {}
  let k = null
  let total = 0
  values.forEach(v => {
    k = Object.keys(v)[0]
    let newK = k.substr(0, 10)
    if (crushed[newK]) {
      total = total + crushed[newK]
    } else {
      let plus = v[k]
      if (type === 'stars') { plus = 1 }
      total = total + plus
    }
    // newK = moment(newK)
    crushed[newK] = total
  })
  let d = []
  _.each(crushed, (k, v) => {
    d.push({x: v, y: k})
  })
  d = d.sort((a, b) => { return a.x - b.x })
  const startDate = moment(d[0].x)
  const endDate = moment(d[d.length - 1].x)
  const diffDays = endDate.diff(startDate, 'days')
  console.log(diffDays)
  const dummyDate = {x: null, y: null}
  if (diffDays < 30) {
    dummyDate.x = startDate.add(30, 'days')
    d.push(dummyDate)
  }

  // console.log(d)
  return d
}

let nData = normalizeData(dummyData)
let d = moment()
nData = []
nData[0] = {x: d, y: 0}
// console.log('NDATA', nData)

export default Line.extend({
  props: {
    type: String
  },
  mounted () {
    if (this.type === 'points') {
      yMax = 4000
    } else {
      yMax = 50
    }
    console.log('TYPE', this.type, yMax)
    const recordKey = this.$store.state.username + '_levels'
    let record = JSON.parse(localStorage.getItem(recordKey))
    let nData = normalizeData(record, this.type)

    console.log('RECORD', nData)

    this.renderChart({
      datasets: [
        {
          label: 'Stars',
          backgroundColor: '#ffffff',
          borderColor: '#149718', // rgb(255, 99, 132)',
          borderWidth: 6,
          color: '#00ff00',
          data: nData
        }
      ]
    },
    {
      elements: {
        line: {
          tension: 0 // disables bezier curves
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            unit: 'day',
            min: nData[0].x
          },
          ticks: {
            source: 'data'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            max: yMax
          }
        }]
      }
    })
  }
})


