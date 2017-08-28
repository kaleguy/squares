webpackJsonp([0],[,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),s=n(5),i=n.n(s),u=n(6),a=n(11),c=n(37),l=n(39),f=n.n(l);o.a.use(r.a),o.a.use(i.a),o.a.use(f.a),o.a.config.productionTip=!1,new o.a({el:"#app",router:a.a,store:c.a,template:"<App/>",components:{App:u.a},data:{keys:"bz"},mounted:function(){}})},,,function(t,e,n){"use strict";function o(t){n(7)}var r=n(9),s=n(10),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},,function(t,e,n){"use strict";e.a={name:"app"}},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";var o=n(1),r=n(12),s=n(13),i=n(17),u=n(21);o.a.use(r.a),e.a=new r.a({routes:[{path:"/",component:s.a},{path:"/menu/:operator",component:i.a},{path:"/card/:operator/:level",component:u.a}]})},,function(t,e,n){"use strict";function o(t){n(14)}var r=n(15),s=n(16),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(t,e,n){"use strict";var o={name:"mainmenu",components:{},data:function(){return{}},methods:{goto:function(t){console.log(t.operator),this.$router.replace("/menu/"+t)}},computed:{levels:function(){return console.log(this.$store.state.levels),this.$store.state.levels}},mounted:function(){},updated:function(){}};e.a=o},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("div",{staticClass:"squares csquares"},[n("div",{on:{click:function(e){t.goto("+")}}},[t._v("+")]),t._v(" "),n("div",{on:{click:function(e){t.goto("-")}}},[t._v("―")]),t._v(" "),n("div",{on:{click:function(e){t.goto("X")}}},[t._v("×")]),t._v(" "),n("div",{on:{click:function(e){t.goto("/")}}},[t._v("÷")])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"squares bsquares",staticStyle:{display:"flex","flex-direction":"row",height:"100%"}},[n("div",{staticClass:"title-button"},[t._v("squares")]),t._v(" "),n("div",{staticClass:"title-button",staticStyle:{background:"#fff",color:"#000","font-size":"160px","line-height":"0.7"}},[t._v("▦")])])}],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function o(t){n(18)}var r=n(19),s=n(20),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(t,e,n){"use strict";var o={name:"submenu",components:{},props:{},data:function(){return{}},methods:{menu:function(){this.$router.replace("/")},submit:function(){},goto:function(t){this.$router.replace("/card/"+this.operator+"/"+t)},passed:function(t){var e="";return this.$store.state.passedLevels[this.operator+t]&&(e="passed"),e}},computed:{num1:function(){return this.$store.state.num1},levels:function(){return[1,2,3,4,5,6,7,8,9]},operator:function(){return this.$route.params.operator||"+"}},mounted:function(){},updated:function(){}};e.a=o},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"squares"},[t._l(t.levels,function(e){return n("div",{class:t.passed(e),on:{click:function(n){t.goto(e)}}},[n("span",{staticClass:"operator"},[t._v(t._s(t.operator))]),n("span",{staticClass:"level"},[t._v(t._s(e))])])}),t._v(" "),n("div",{staticClass:"arrow",on:{click:t.menu}},[t._v("⇦")])],2)},r=[],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function o(t){n(22)}var r=n(23),s=n(36),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(t,e,n){"use strict";var o=n(24),r=n(28),s=n(32),i={key:""};document.onkeypress=function(t){i.key=t.key};var u={name:"hello",components:{numpad:r.a,dots:o.a,timebar:s.a},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{num1:function(){return this.$store.state.num1},num2:function(){return this.$store.state.currentLevel.index},total:function(){return this.$store.state.total},buffer:function(){return this.$store.state.buffer},operator:function(){return this.$route.params.operator||"+"},level:function(){return this.$route.params.level||"1"}},mounted:function(){var t=this.level,e=this.operator;this.$store.commit("RESET",{operator:e,level:t})},updated:function(){}};e.a=u},function(t,e,n){"use strict";function o(t){n(25)}var r=n(26),s=n(27),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(t,e,n){"use strict";var o={name:"dots",components:{},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{dots:function(){for(var t=[],e=0;e<14;e++)t[e]=0;return t},count:function(){return this.$store.state.count}},mounted:function(){},updated:function(){}};e.a=o},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dotbar"},t._l(t.dots,function(e,o){return n("div",{class:[o<t.count?"ball":"","dot"]})}))},r=[],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function o(t){n(29)}var r=n(30),s=n(31),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(module,__webpack_exports__,__webpack_require__){"use strict";var keyBus={key:""};document.onkeypress=function(t){console.log("xx",t.key),keyBus.key=t.key};var vm={name:"numpad",props:{level:Object},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){},getNum:function(t){var e=t.target.innerText;return"⊗"===e?this.$store.commit("CLEARBUFFER"):(this.$store.commit("ADDTOBUFFER",{num:e}),this.checkTotal())},menu:function(){this.$router.replace("/menu/"+this.op)},checkTotal:function checkTotal(){var _this=this,num1=this.$store.state.num1,num2=this.$store.state.currentLevel.index,level=this.$store.state.currentLevel,op=this.op;"x"===op&&(op="*");var total=0,l="total = +num1 "+op+" +num2";eval("total = +num1 "+op+" +num2");var buffer=this.$store.state.buffer;if(!(buffer<10&&total>9))if(+total==+buffer){this.$store.commit("INCCOUNT"),this.$store.commit("RESET");var count=this.$store.state.count;if(14===count){var levelKey=this.op+num2;console.log(levelKey),this.$store.commit("SETPASS",{key:levelKey}),this.$swal("Good Job!","You passed this level","success").then(function(){return _this.$router.replace("/menu/"+op)})}else console.log(count)}else this.$store.commit("CLEARBUFFER"),this.$store.commit("RESETALL"),console.log(total,num1,num2,"NG")}},computed:{op:function(){return this.$store.state.currentLevel.op}}};__webpack_exports__.a=vm},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"numpad",on:{click:t.getNum}},[n("div",[t._v("1")]),n("div",[t._v("2")]),n("div",[t._v("3")]),t._v(" "),n("div",[t._v("4")]),n("div",[t._v("5")]),n("div",[t._v("6")]),t._v(" "),n("div",[t._v("7")]),n("div",[t._v("8")]),n("div",[t._v("9")]),t._v(" "),n("div",{staticClass:"back",on:{click:t.menu}},[t._v("⇦")]),t._v(" "),n("div",[t._v("0")]),t._v(" "),n("div",{staticClass:"del"},[t._v("⊗")])])},r=[],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function o(t){n(33)}var r=n(34),s=n(35),i=n(0),u=o,a=i(r.a,s.a,u,null,null);e.a=a.exports},function(t,e){},function(t,e,n){"use strict";var o={name:"timebar",props:{active:"boolean"},components:{},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{dots:function(){return[0,0,0,0,0,0,0,0,0]},count:function(){return this.$store.state.count}},mounted:function(){function t(){n=o.$store.state.time,n<240?(n+=1,e.style.width=n+"px"):(o.$store.commit("RESETALL"),n=-8),o.$store.commit("SETTIME",{time:n})}console.log("MOUNTED");var e=document.getElementById("timebarFill");e.style.width=0,this.$store.commit("RESETALL");var n=this.$store.state.time,o=this;window.mytimer&&window.clearInterval(window.mytimer),console.log("got here"),window.mytimer=window.setInterval(t,150)},updated:function(){}};e.a=o},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"timebar"},[n("div",{attrs:{id:"timebarFill"}})])])}],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"flex","flex-direction":"column",height:"100%"}},[n("div",{staticStyle:{margin:"auto"}},[n("dots"),t._v(" "),n("div",{staticClass:"math"},[n("div",[t._v(t._s(t.num1))]),t._v(" "),n("div",[t._v(t._s(t.operator)+" "+t._s(t.num2))]),t._v(" "),n("div",{staticClass:"total"},[t._v(t._s(t.buffer))])]),t._v(" "),n("timebar"),t._v(" "),n("numpad")],1)])},r=[],s={render:o,staticRenderFns:r};e.a=s},function(t,e,n){"use strict";function o(t){var e=Math.floor(10*Math.random())+1;return t!==e?e:o(t)}var r=n(1),s=n(2),i=n(38);r.a.use(s.a),e.a=new s.a.Store({state:{currentLevel:{op:"",index:0},levels:i,passedLevels:{},num1:0,num2:0,total:0,buffer:"",count:0,time:0},mutations:{RESET:function(t,e){t.num1=o(t.num1),t.num2=o(t.num2),t.total=t.num1+t.num2,t.buffer="",e&&(t.currentLevel.index=e.level,t.currentLevel.op=e.operator)},ADDTOBUFFER:function(t,e){t.buffer=""+t.buffer+e.num,t.buffer.length>2&&(t.buffer=t.buffer.substring(1))},CLEARBUFFER:function(t){t.buffer=""},INCCOUNT:function(t){t.count=t.count+1},SETTIME:function(t,e){t.time=e.time},RESETALL:function(t){t.count=0,t.time=0,t.num1=Math.floor(10*Math.random()),t.num2=Math.floor(10*Math.random()),t.buffer=""},SETPASS:function(t,e){t.passedLevels[e.key]=1}},actions:{dummy:function(t,e){}}})},function(t,e){t.exports=[{operator:"+"},{operator:"-"},{operator:"*"},{operator:"d"}]}],[3]);
//# sourceMappingURL=app.020f4bdf340d8f050f6c.js.map