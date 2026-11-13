// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { applyTheme, currentThemeId } from './lib/theme'
import { start as startAnalytics, screenFor } from './lib/analytics'
import { lastUser, levelsKey, titleCase, users } from './lib/name'
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

// Whoever played last is still playing. Entering a name is all there is to
// signing in, so it ought to be all there is to staying signed in: the app
// opens on the operator menu rather than on the name screen, and the name at
// the top of that menu is the way back to it.
const resumed = titleCase(lastUser())
if (resumed && users().indexOf(resumed) > -1) {
  store.commit('SETUSER', { username: resumed })
  const records = JSON.parse(localStorage.getItem(levelsKey(resumed))) || {}
  Object.keys(records).forEach(function (key) {
    store.commit('SETPASS', { key: key })
  })
  if (window.location.hash === '' || window.location.hash === '#/') {
    router.replace('/main/')
  }
}
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

