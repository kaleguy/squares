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

function normalizeData (data, points) {
  // const normalized = []
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
      if (points) { plus = 1 }
      total = total + plus
    }
    newK = moment(newK)
    crushed[newK] = total
  })
  let d = []
  _.each(crushed, (k, v) => {
    d.push({x: v, y: k})
  })
  d = d.sort((a, b) => { return a.x - b.x })
  console.log(d)
  return d
}

const nData = normalizeData(dummyData)
console.log('NDATA', nData)

export default Line.extend({
  mounted () {
    const recordKey = this.$store.state.username + '_levels'
    let record = JSON.parse(localStorage.getItem(recordKey))
    console.log('RECORD', record)

    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Stars',
          backgroundColor: '#ffffff',
          borderColor: 'rgb(255, 99, 132)',
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
            max: 500
          }
        }]
      }
    })
  }
})


