// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueEvents from 'vue-events'
import App from './App'
import router from './router'
import store from './store'
import VueSweetAlert from 'vue-sweetalert'
// import Icon from 'vue-awesome/components/Icon.vue'
// import 'vue-awesome/icons/times-circle'

Vue.use(Vuex)
Vue.use(VueEvents)
Vue.use(VueSweetAlert)
// Vue.component('icon', Icon)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    keys: 'bz'
  },
  mounted () {
    // this.$events.fire('keys', this.eventData)
    // this.$events.emit('testEvent', this.eventData)
    // this.$events.$emit('testEvent', this.eventData)
  }
})

