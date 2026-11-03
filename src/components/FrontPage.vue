<template>
  <div class="page login-page">
    <div>
    <div class="squares bsquares">
      <div class="title-button brand-tile">
        <span class="brand-name">squares</span>
        <span class="brand-sub">math facts</span>
      </div>
    </div>
    <div style="width:278px; margin-left:auto;margin-right:auto;margin-top:20px">
    <div class="type-ahead-group">
      <input id="name"
             type="text"
             autocomplete="off"
             size="16"
             placeholder="Enter your name">
    </div>
    </div>
    <button type="button" class="help-link" @click="help">Help</button>
    </div>
  </div>
</template>

<script>
import { titleCase, levelsKey } from '../lib/name'
const TypeAhead = require('../lib/type-ahead')
const vm = {
  name: 'frontpage',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    help: function () {
      this.$router.push('/help')
    },
    getRecords: function (key) {
      const records = JSON.parse(localStorage.getItem(key))
      if (!records) { return }
      Object.keys(records).forEach(k => {
        this.$store.commit('SETPASS', {key: k})
      })
    }
  },
  computed: {
  },
  mounted () {
    const me = this
    let nameList = JSON.parse(localStorage.getItem('nameList'))
    if (!nameList) {
      nameList = {}
    }
    const names = Object.keys(nameList).map(titleCase).filter(function (name, index, list) {
      return list.indexOf(name) === index
    })
    const t = new TypeAhead(
      document.getElementById('name'),
      names,
      {
        minLength: 1,
        onKeyDown: function (value) {
          if (value.length < 2) { return }
          const name = titleCase(value)
          me.$store.commit('SETUSER', { username: name })
          me.getRecords(levelsKey(value))
          if (name !== value) { delete nameList[value] }
          nameList[name] = 1
          localStorage.setItem('nameList', JSON.stringify(nameList))
          me.$router.replace('/main/')
        }
      })
    console.log('TYPEAHEAD', t)
  },
  updated () {
  }
}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.squares DIV.title-button.brand-tile
  flex-direction: column
  gap: 10px
  width: 220px
  height: 220px
  margin: 0 auto
  padding: 0
  .brand-name
    font-size: 46px
    font-weight: 700
    line-height: 1
  .brand-sub
    font-size: 16px
    font-weight: 400
    line-height: 1
.bsquares, .csquares
  font-size: 32px
  font-weight: bold
  width: 303px
.bsquares DIV
  width: 140px
  height: 140px
.csquares DIV
  width: 140px
  height: 140px
  line-height: 1
</style>
