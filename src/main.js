// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { applyTheme, currentThemeId } from './lib/theme'
import { start as startAnalytics, screenFor } from './lib/analytics'
import Vue from 'vue'
import Vuex from 'vuex'
import VueEvents from 'vue-events'
import App from './App'
import router from './router'
import store from './store'
import VueSweetAlert from 'vue-sweetalert'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)
Vue.use(Vuex)
Vue.use(VueEvents)
Vue.use(VueSweetAlert)

Vue.config.productionTip = false
applyTheme(currentThemeId())
startAnalytics()
// The screens are named where the routing already knows which one is which.
router.afterEach(function (to) { screenFor(to) })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
  },
  mounted () {
  }
})

