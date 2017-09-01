<template>
  <div class="squares" style="margin-top:40px;">
    <div v-for="level in levels"
         v-bind:class="passed(level)"
         @click="goto(level)">
      <span class="operator">{{visOperator}}</span><span class="level">{{level}}</span>
    </div>
    <div class="arrow" scale="4" @click="menu"></div>

<div style="width:200px;height:200px;border:none;box-shadow:none;margin-left:auto;margin-right:auto;">
    <svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="svg2"
   viewBox="0 0 100 100"
   xml:space="preserve"
   inkscape:version="0.48.1 r9760"
   sodipodi:docname="dark blue left arrow.svg"><sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="652"
     inkscape:window-height="480"
     id="namedview17"
     showgrid="false"
     fit-margin-top="0"
     fit-margin-left="0"
     fit-margin-right="0"
     fit-margin-bottom="0"
     inkscape:zoom="0.27878788"
     inkscape:cx="305.65955"
     inkscape:cy="157.40995"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="0"
     inkscape:current-layer="svg2" /><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /></cc:Work></rdf:RDF></metadata><defs
     id="defs6"><clipPath
       id="clipPath18"><path
         d="M 0,792 1224,792 1224,0 0,0 0,792 z"
         id="path20"
         inkscape:connector-curvature="0" /></clipPath><clipPath
       id="clipPath26"><path
         d="m 248.406,36 727.909,0 0,700.912 -727.909,0 0,-700.912 z"
         id="path28"
         inkscape:connector-curvature="0" /></clipPath><clipPath
       id="clipPath50"><path
         d="m 0,0 1224,0 0,792 L 0,792 0,0 z"
         id="path52"
         inkscape:connector-curvature="0" /></clipPath><clipPath
       id="clipPath60"><path
         d="M 0,792 1224,792 1224,0 0,0 0,792 z"
         id="path62"
         inkscape:connector-curvature="0" /></clipPath><clipPath
       id="clipPath78"><path
         d="m 0,0 1224,0 0,792 L 0,792 0,0 z"
         id="path80"
         inkscape:connector-curvature="0" /></clipPath></defs><g
     transform="matrix(1.25,0,0,-1.25,-459.34045,371.52005)"
     id="g10"><path
       d="m 383.07536,296.81604 -15.203,-13.205 15.203,-13.139 0,6.296 11.997,0 0,13.645 -11.997,0 0,6.403 z"
       id="path202"
       style="fill:#0000ff;fill-opacity:1;stroke:#214f8f;stroke-width:0.80000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"
       inkscape:connector-curvature="0" /></g></svg>
</div>


  </div>






</template>

<script>
// const _ = require('lodash')
const vm = {
  name: 'submenu',
  components: {
  },
  props: {
    // levels: Object
  },
  data () {
    return {
    }
  },
  methods: {
    menu: function () {
      this.$router.replace('/main/')
    },
    goto: function (level) {
      this.$router.replace('/card/' + this.operator + '/' + level)
    },
    passed (level) {
      let cssClass = ''
      const passedLevels = this.$store.state.passedLevels
      const levelKey = this.operator + level
      if (passedLevels[levelKey]) {
        cssClass = 'passed'
      }
      // console.log(cssClass, passedLevels)
      return cssClass
    }
  },
  computed: {
    num1 () {
      return this.$store.state.num1
    },
    levels () {
      // console.log('CURRENT LEVEL = ', this.$store.state.currentLevel)
      // const allLevels = this.$store.state.levels
      // const l = _.find(allLevels, l => l.operator === this.operator).levels
      return [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    visOperator () {
      if (this.operator === 'd') {
        return '\u00f7'
      }
      if (this.operator === 'X') {
        return '\u00d7'
      }
      if (this.operator === '-') {
        return '\u2212'
      }
      return this.operator
    },
    operator () {
      let op = this.$route.params.operator || '+'
      return op
    }
  },
  mounted () {

  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.operator
  font-size: 44px
  display: inline-block
  padding-top: 0
  line-height: .5em
  margin: 0
  margin-bottom: 200px
.level
  display: inline-block
  padding: 0
  font-weight: bold
.passed
  background: green
</style>
