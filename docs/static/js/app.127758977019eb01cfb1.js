webpackJsonp([0],[,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),r=n(2),o=n(5),i=n.n(o),a=n(6),u=n(11),c=n(41),l=n(43),d=n.n(l);s.a.use(r.a),s.a.use(i.a),s.a.use(d.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:u.a,store:c.a,template:"<App/>",components:{App:a.a},data:{keys:"bz"},mounted:function(){}})},,,function(t,e,n){"use strict";function s(t){n(7)}var r=n(9),o=n(10),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},,function(t,e,n){"use strict";e.a={name:"app"}},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";var s=n(1),r=n(12),o=n(13),i=n(17),a=n(21);s.a.use(r.a),e.a=new r.a({routes:[{path:"/",component:o.a},{path:"/menu/:operator",component:i.a},{path:"/card/:operator/:level",component:a.a}]})},,function(t,e,n){"use strict";function s(t){n(14)}var r=n(15),o=n(16),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s={name:"mainmenu",components:{},data:function(){return{}},methods:{goto:function(t){console.log(t.operator),this.$router.replace("/menu/"+t)}},computed:{levels:function(){return console.log(this.$store.state.levels),this.$store.state.levels}},mounted:function(){},updated:function(){}};e.a=s},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"margin-top":"40px"}},[n("div",{staticClass:"squares bsquares",staticStyle:{display:"flex","flex-direction":"row",height:"100%"}},[n("div",{staticClass:"title-button"},[t._v("squares")]),t._v(" "),n("div",{staticClass:"title-button",staticStyle:{background:"#fff",cursor:"pointer",color:"#000","font-size":"44px","line-height":"0.7"},on:{click:function(e){t.goto("s")}}},[t._v("\n\n    ■■■"),n("br"),t._v("\n    ■■■"),n("br"),t._v("\n    ■■■\n\n  ")])]),t._v(" "),n("div",{staticClass:"squares csquares"},[n("div",{on:{click:function(e){t.goto("+")}}},[t._v("+")]),t._v(" "),n("div",{on:{click:function(e){t.goto("-")}}},[t._v("―")]),t._v(" "),n("div",{on:{click:function(e){t.goto("X")}}},[t._v("×")]),t._v(" "),n("div",{on:{click:function(e){t.goto("d")}}},[t._v("÷")])])])},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t){n(18)}var r=n(19),o=n(20),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s={name:"submenu",components:{},props:{},data:function(){return{}},methods:{menu:function(){this.$router.replace("/")},submit:function(){},goto:function(t){this.$router.replace("/card/"+this.operator+"/"+t)},passed:function(t){var e="";return this.$store.state.passedLevels[this.operator+t]&&(e="passed"),e}},computed:{num1:function(){return this.$store.state.num1},levels:function(){return[1,2,3,4,5,6,7,8,9]},operator:function(){var t=this.$route.params.operator||"+";return"d"===t&&(t="÷"),t}},mounted:function(){},updated:function(){}};e.a=s},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"squares",staticStyle:{"margin-top":"40px"}},[t._l(t.levels,function(e){return n("div",{class:t.passed(e),on:{click:function(n){t.goto(e)}}},[n("span",{staticClass:"operator"},[t._v(t._s(t.operator))]),n("span",{staticClass:"level"},[t._v(t._s(e))])])}),t._v(" "),n("div",{staticClass:"arrow",on:{click:t.menu}},[t._v("⇦")])],2)},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t){n(22)}var r=n(23),o=n(40),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s=n(24),r=n(28),o=n(32),i=n(36),a={key:""};document.onkeypress=function(t){a.key=t.key};var u={name:"hello",components:{numpad:r.a,dots:s.a,timebar:o.a,dice:i.a},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{op:function(){return this.$store.state.currentLevel.op},num1:function(){var t=this.$store.state.num1;return"-"===this.op&&(t=this.$store.state.num1+ +this.num2),"d"===this.op&&(t=this.$store.state.num1*this.num2),t},num2:function(){return console.log("xxxxxx",this.$store.state.currentLevel.index),this.$store.state.currentLevel.index},total:function(){return this.$store.state.total},buffer:function(){return this.$store.state.buffer},operator:function(){return this.$route.params.operator||"+"},level:function(){return this.$route.params.level||"1"}},mounted:function(){var t=this.level,e=this.operator;this.$store.commit("RESET",{operator:e,level:t})},updated:function(){}};e.a=u},function(t,e,n){"use strict";function s(t){n(25)}var r=n(26),o=n(27),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s={name:"dots",components:{},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{dots:function(){for(var t=[],e=0;e<14;e++)t[e]=0;return t},count:function(){return this.$store.state.count}},mounted:function(){},updated:function(){}};e.a=s},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dotbar"},t._l(t.dots,function(e,s){return n("div",{class:[s<t.count?"ball":"","dot"]})}))},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t){n(29)}var r=n(30),o=n(31),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(module,__webpack_exports__,__webpack_require__){"use strict";var keyBus={key:""};document.onkeypress=function(t){console.log("xx",t.key),keyBus.key=t.key};var vm={name:"numpad",props:{level:Object},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){},getNum:function(t){var e=t.target.innerText;return"⊗"===e?this.$store.commit("CLEARBUFFER"):(this.$store.commit("ADDTOBUFFER",{num:e}),this.checkTotal())},menu:function(){this.$router.replace("/menu/"+this.op)},checkTotal:function checkTotal(){var _this=this,num1=this.$store.state.num1,num2=this.$store.state.currentLevel.index;"-"===this.op&&(num1=+this.$store.state.num1+ +num2),"d"===this.op&&(num1=+this.$store.state.num1*+num2);var level=this.$store.state.currentLevel,op=this.op;"X"===op&&(op="*"),"d"===op&&(op="/"),"s"===op&&(op="+",num2=0);var total=0,l="total = +num1 "+op+" +num2";console.log("L",l),eval("total = +num1 "+op+" +num2"),total/=1;var buffer=this.$store.state.buffer;if(!(buffer<10&&total>9))if(+total==+buffer){this.$store.commit("INCCOUNT"),this.$store.commit("RESET",{operator:this.$store.state.currentLevel.op,level:this.$store.state.currentLevel.index});var count=this.$store.state.count;if(14===count){var levelKey=this.op+num2;console.log(levelKey),this.$store.commit("SETPASS",{key:levelKey}),this.$swal("Good Job!","You passed this level","success").then(function(){return _this.$router.replace("/menu/"+_this.op)})}else console.log(count)}else this.$store.commit("CLEARBUFFER"),this.$store.commit("RESETALL"),console.log(total,num1,num2,"NG")}},computed:{op:function(){return this.$store.state.currentLevel.op}}};__webpack_exports__.a=vm},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"numpad",on:{click:t.getNum}},[n("div",[t._v("1")]),n("div",[t._v("2")]),n("div",[t._v("3")]),t._v(" "),n("div",[t._v("4")]),n("div",[t._v("5")]),n("div",[t._v("6")]),t._v(" "),n("div",[t._v("7")]),n("div",[t._v("8")]),n("div",[t._v("9")]),t._v(" "),n("div",{staticClass:"back",on:{click:t.menu}},[t._v("⇦")]),t._v(" "),n("div",[t._v("0")]),t._v(" "),n("div",{staticClass:"del"},[t._v("⊗")])])},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t){n(33)}var r=n(34),o=n(35),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s={name:"timebar",props:{active:"boolean"},components:{},data:function(){return{}},methods:{submit:function(){},warn:function(t,e){e&&e.preventDefault(),alert(t)}},computed:{dots:function(){return[0,0,0,0,0,0,0,0,0]},count:function(){return this.$store.state.count}},mounted:function(){function t(){n=s.$store.state.time,n<240?(n+=1,e.style.width=n+"px"):(s.$store.commit("RESETALL"),n=-8),s.$store.commit("SETTIME",{time:n})}console.log("MOUNTED");var e=document.getElementById("timebarFill");e.style.width=0,this.$store.commit("RESETALL");var n=this.$store.state.time,s=this;window.mytimer&&window.clearInterval(window.mytimer),console.log("got here"),window.mytimer=window.setInterval(t,250)},updated:function(){}};e.a=s},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"timebar"},[n("div",{attrs:{id:"timebarFill"}})])])}],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t){n(37)}var r=n(38),o=n(39),i=n(0),a=s,u=i(r.a,o.a,a,null,null);e.a=u.exports},function(t,e){},function(t,e,n){"use strict";var s={name:"dice",props:{count:Object},components:{},data:function(){return{}},methods:{},computed:{num1:function(){return this.$store.state.num1}},mounted:function(){},updated:function(){}};e.a=s},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[1===t.num1?n("div",[t._m(0)]):t._e(),t._v(" "),2===t.num1?n("div",[t._m(1)]):t._e(),t._v(" "),3===t.num1?n("div",[t._m(2)]):t._e(),t._v(" "),4===t.num1?n("div",[t._m(3)]):t._e(),t._v(" "),5===t.num1?n("div",[t._m(4)]):t._e(),t._v(" "),6===t.num1?n("div",[t._m(5)]):t._e(),t._v(" "),t.num1>6?n("div",[n("table",{staticClass:"dice"},[t._m(6),t._v(" "),n("tr",[n("td"),n("td",[t._v(t._s(t.num1))]),n("td")]),t._v(" "),t._m(7)])]):t._e()])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td"),n("td"),n("td")]),t._v(" "),n("tr",[n("td"),n("td",{staticClass:"d"}),n("td")]),t._v(" "),n("tr",[n("td"),n("td"),n("td")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td"),n("td"),n("td",{staticClass:"d"})]),t._v(" "),n("tr",[n("td"),n("td"),n("td")]),t._v(" "),n("tr",[n("td",{staticClass:"d"}),n("td"),n("td")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td"),n("td"),n("td",{staticClass:"d"})]),t._v(" "),n("tr",[n("td"),n("td",{staticClass:"d"}),n("td")]),t._v(" "),n("tr",[n("td",{staticClass:"d"}),n("td"),n("td")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td",{staticClass:"d"}),n("td"),n("td",{staticClass:"d"})]),t._v(" "),n("tr",[n("td"),n("td"),n("td")]),t._v(" "),n("tr",[n("td",{staticClass:"d"}),n("td"),n("td",{staticClass:"d"})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td",{staticClass:"d"}),n("td"),n("td",{staticClass:"d"})]),t._v(" "),n("tr",[n("td"),n("td",{staticClass:"d"}),n("td")]),t._v(" "),n("tr",[n("td",{staticClass:"d"}),n("td"),n("td",{staticClass:"d"})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"dice"},[n("tr",[n("td"),n("td"),n("td")]),t._v(" "),n("tr",[n("td"),n("td",{staticClass:"d"}),n("td")]),t._v(" "),n("tr",[n("td"),n("td"),n("td")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td"),n("td"),n("td")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td"),n("td"),n("td")])}],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"flex","flex-direction":"column",height:"100%"}},[n("div",{staticStyle:{margin:"auto"}},[n("dots"),t._v(" "),"s"===t.op?n("div",[n("dice")],1):n("div",[n("div",{staticClass:"math"},[n("div",[t._v(t._s(t.num1))]),t._v(" "),n("div",[t._v(t._s(t.operator)+" "+t._s(t.num2))]),t._v(" "),n("div",{staticClass:"total"},[t._v(t._s(t.buffer))])])]),t._v(" "),n("timebar"),t._v(" "),n("numpad")],1)])},r=[],o={render:s,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";function s(t,e,n,r){var o=9,i=1;r=r||{},e=e||"foo",n=n||"bar";var a=e+n,u=r[a];u&&(i=u.min||i,o=u.max||o);var c=Math.floor(Math.random()*(o-i+1)+i);return t!==c?c:s(t,e,n,r)}var r=n(1),o=n(2),i=n(42);r.a.use(o.a);var a={s1:{min:0,max:5}};e.a=new o.a.Store({state:{currentLevel:{op:"",index:0},levels:i,passedLevels:{},num1:0,num2:0,total:0,buffer:"",count:0,time:0},mutations:{RESET:function(t,e){t.num1=s(t.num1,e.operator,e.level,a),t.num2=s(t.num2,e.operator,e.level),t.total=t.num1+t.num2,t.buffer="",e&&e.level&&e.operator&&(t.currentLevel.index=e.level,t.currentLevel.op=e.operator)},ADDTOBUFFER:function(t,e){t.buffer=""+t.buffer+e.num,t.buffer.length>2&&(t.buffer=t.buffer.substring(1))},CLEARBUFFER:function(t){t.buffer=""},INCCOUNT:function(t){t.count=t.count+1},SETTIME:function(t,e){t.time=e.time},RESETALL:function(t){t.count=0,t.time=0,t.num1=s(0,null),t.num2=s(0,null),t.buffer=""},SETPASS:function(t,e){t.passedLevels[e.key]=1}},actions:{dummy:function(t,e){}}})},function(t,e){t.exports=[{operator:"+"},{operator:"-"},{operator:"*"},{operator:"d"}]}],[3]);
//# sourceMappingURL=app.127758977019eb01cfb1.js.map