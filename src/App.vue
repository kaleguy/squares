<template>
  <div id="app" style="height:100%;">
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
#app
  height: 100%
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

// Fact table and answergrid
.numerand0
  background: #000
  color: #fff
.numerand1
  background: orange
.activen
  background: blue
  color: #fff
.product
  background: green
  color: #fff
.numerand2
  background: blue
.active
  background: green
  font-weight: bold
  color: #fff
.fheading
  font-size: 40px
  font-weight: bold
  color: #fff
  width: 300px
  margin-left: auto
  margin-right: auto
  padding-left: 24px
  DIV
    width: 60px
    margin: 0
    border-radius: 6px
    display: inline-block
  .large-operator
    color: #000
    width: 30px
.fact-table
  cursor: pointer
  width: 340px
  border: 1px solid #fff
  margin-top: 30px
  position: relative
  margin-left: auto
  margin-right: auto
  .toperator
    padding: 6px
    border-right: 2px solid #fff
    font-weight: bold
    font-size: 2em
    line-height: 1
  .col
    border-right: 1px solid #fff
    color: #fff
  .row
  // border-bottom: 2px solid #333
  TABLE
    width: 100%
    border-collapse: collapse
    border: 1px solid #fff
    // margin-left: -10px
    TD
      font-size: 20px
      font-weight: bold
      padding-top: 4px
      padding-bottom: 4px
      border-bottom: 1px solid #fff
      border-right: 1px solid #fff
      width: 30px
.csquares DIV.icon
  line-height: 79px
DIV.icon
  display: inline-block
  font-size: 50px
  line-height: 60px
  width: 50px
  height: 50px
  margin: 0 auto
  background-size: cover
  background-repeat: no-repeat
  background-position: 50% 50%
.icon-star
  width: 100px
  height: 100px
  color: #90ee90
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMS4yMDEgMjkuNjc2Ij48cG9seWdvbiBwb2ludHM9IjE1LjYwMiwwIDE5LjMyNSwxMS4yNzkgMzEuMiwxMS4zMzIgMjEuNjI0LDE4LjM2IDI1LjI0MywyOS42NzYgMTUuNjAyLDIyLjczOCA1Ljk2LDI5LjY3NiA5LjU3NywxOC4zNiAwLDExLjMzMiAxMS44NzgsMTEuMjc5IiBmaWxsPSIjMDA5OTAwIiAvPjwvc3ZnPg==")
.icon-point
  color: #90ee90
  width: 100px
  height: 100px
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><circle cx='70' cy='62' r='52' fill='#149718'/></svg>")


</style>
