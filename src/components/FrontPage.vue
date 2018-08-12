<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
    <div class="squares bsquares"
         style="margin-top:-55px">
      <div class="title-button"
           style="margin-left:auto;margin-right:auto;cursor:pointer">squares</div>
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
    </div>
  </div>
</template>

<script>
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
    const names = Object.keys(nameList)
    const t = new TypeAhead(
      document.getElementById('name'),
      names,
      {
        minLength: 1,
        onKeyDown: function (value) {
          if (value.length < 2) { return }
          me.$store.commit('SETUSER', { username: value })
          const recordKey = value + '_levels'
          me.getRecords(recordKey)
          nameList[value] = 1
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
.bsquares, .csquares
  font-size: 32px
  font-weight: bold
  width: 303px
.bsquares DIV
  width: 140px
  height: 120px
.csquares DIV
  width: 140px
  height: 100px
  line-height: .7
</style>
