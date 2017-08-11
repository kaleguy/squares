<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div style="margin: auto;">
      <div class="math">
        <div>{{num1}}</div>
        <div>{{operator}} {{num2}}</div>
        <div class="total">{{buffer}}</div>
      </div>
      <dots></dots>
      <timebar></timebar>
      <numpad></numpad>
    </div>
  </div>
</template>


<script>
import DotBar from './Dotbar'
import NumPad from './NumPad'
import TimeBar from './TimeBar'
const keyBus = {
  key: ''
}
document.onkeypress = function (e) {
  console.log('xx', e.key)
  keyBus.key = e.key
}
const vm = {
  name: 'hello',
  components: {
    numpad: NumPad,
    dots: DotBar,
    timebar: TimeBar
  },
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      // console.log('foo')
    },

    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    }
  },
  computed: {
    num1 () {
      return this.$store.state.num1
    },
    num2 () {
      return this.$store.state.num2
    },
    total () {
      return this.$store.state.total
    },
    buffer () {
      return this.$store.state.buffer
    },
    operator () {
      return this.$route.params.operator || '+'
    }
  },
  mounted () {
    console.log('MOUNTED')
    this.$store.commit('RESET')
  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
HTML, BODY
  width: 100%
  max-width: 100%
  height: 100%
.math
  box-shadow: 2px 2px 5px #888888;
  font-size: 4.5em
  font-family: verdana
  font-weight: bold
  color: #00f
  border: 2px solid blue
  max-width: 300px
  width: 3em
  margin-left: auto
  margin-right: auto
  border-radius: 20px
  margin-bottom: 8px
  padding: 0px
  line-height: .95em
  padding-right: 30px
  height: 3.3em
  DIV
    text-align: right
    //border: 1px solid red
    margin-left: 30px
.total
  border-top: 10px solid blue
  //width: 160px
  //float: right
  padding-top: 5px
  margin-top: 12px
</style>
