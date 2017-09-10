<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
HTML, BODY
  margin: 0
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
  height: 100%
  width: 100%
.squares
  width: 360px
  margin-left: auto
  margin-right: auto
  display: flex
  flex-wrap: wrap
  flex-direction: row
  DIV.title-button
    font-size: 1em
    line-height: 3em
    background: #33f
    color: #fff
    cursor: default
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  DIV
    // box-shadow: 2px 2px 5px #888888;
    cursor: pointer
    font-size: 3.5em
    padding-top: 26px
    line-height: 1em
    width: 100px
    border: 3px solid #333
    border-radius: 10px
    height: 80px
    margin: 6px
  DIV.review-button
    width: 330px
.fa-icon
  width: auto
  height: 1em /* or any other relative font sizes */
.fa
  font-size: 70px
.type-ahead-group
  position: relative
.type-ahead-group > input
  background-color: #FFFFFF
  background-image: none
  border-radius: 4px
  border: 1px solid #CCCCCC
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075)
  color: #555555
  font-size: 24px
  line-height: 1.42857143
  padding: 6px 12px
  //width: 100%
.type-ahead-group > ul
  background-color: #FFFFFF
  border-radius: 4px
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.17)
  display: none
  float: left
  font-size: 24px
  left: 20px
  list-style: none
  margin: 2px 0 0
  min-width: 170px
  padding: 5px 0
  position: absolute
  text-align: left
  top: 100%
  z-index: 1000

.type-ahead-group > ul > li > a
  clear: both
  color: #333
  cursor: default
  display: block
  font-weight: 400
  line-height: 1.42857143
  padding: 3px 20px
  white-space: nowrap
.type-ahead-group > ul > li.active > a, .type-ahead-group > ul > li > a:hover
  background-color: #3F9BFA
  color: #FFFFFF
  text-decoration: none
DIV.uname
  font-weight: bold
  font-size: 75px
  color: #00F
  font-family: "Avenir Next"
  cursor: pointer
  box-shadow: none
  width: 100%
  height: inherit
  border: none
  padding: 0
  // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
</style>
