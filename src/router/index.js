import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import SubMenu from '@/components/SubMenu'
import DiceMenu from '@/components/DiceMenu'
import TestCard from '@/components/TestCard'

Vue.use(Router)

// const foo = { template: '<h1>hi</h1>' }

export default new Router({
  routes: [
    {
      path: '/',
      component: MainMenu
    },
    {
      path: '/menu/s',
      component: DiceMenu
    },
    {
      path: '/menu/:operator',
      component: SubMenu
    },
    {
      path: '/card/:operator/:level',
      component: TestCard
    }
  ]
})
