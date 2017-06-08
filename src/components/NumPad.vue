<template>
  <div class="numpad" @click="getNum">
    <div>7</div><div>8</div><div>9</div>
    <div>4</div><div>5</div><div>6</div>
    <div>1</div><div>2</div><div>3</div>
    <div> </div><div>0</div><div>=</div>
  </div>
</template>


<script>
  const keyBus = {
    key: ''
  }
  document.onkeypress = function (e) {
    console.log('xx', e.key)
    keyBus.key = e.key
  }

  const vm = {
    name: 'numpad',
    data () {
      return {
      }
    },
    methods: {
      submit: function () {
      },

      warn: function (message, event) {
      },
      getNum: function (e) {
        const num = e.target.innerText
        if (num === '=') {
          return this.checkTotal()
        }
        console.log(e.target.innerText)
        this.$store.commit('ADDTOBUFFER', {num})
      },
      checkTotal: function () {
        const total = this.$store.state.num1 + this.$store.state.num2
        const buffer = this.$store.state.buffer
        if (+total === +buffer) {
          console.log('ok')
          this.$store.commit('RESET')
        } else {
          this.$store.commit('CLEARBUFFER')
          console.log('NG')
        }
      }
    },
    computed: {
      num1 () {
      }
    }
  }

  export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
$button-size: 100px
.numpad
  font-size: $button-size
  display: flex
  flex-direction: row
  flex-flow: row wrap
  width: 430px
  margin-left: auto
  margin-right: auto
  border: 1px solid #ccc
  border-radius: 20px
  DIV
    width: $button-size
    height: $button-size
    border: 2px solid #ccc
    border-radius: 10px
    margin: 8px
    padding: 10px
    line-height: 1
    cursor: pointer
</style>
