import Vue from 'vue'
import Router from 'vue-router'
import FrontPage from '@/components/FrontPage'
import MainMenu from '@/components/MainMenu'
import SubMenu from '@/components/SubMenu'
import DiceMenu from '@/components/DiceMenu'
import TestCard from '@/components/TestCard'
import FactTable from '@/components/FactTable'
import FactTablePlus from '@/components/FactTablePlus'
import FactTableX from '@/components/FactTableX'
import Chart from '@/components/Chart'

Vue.use(Router)

// const foo = { template: '<h1>hi</h1>' }

export default new Router({
  routes: [
    {
      path: '/',
      component: FrontPage
    },
    {
      path: '/main/',
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
    },
    {
      path: '/facts/:operator/:level',
      component: FactTable
    },
    {
      path: '/factlist/:operator/:level',
      component: FactTablePlus
    },
    {
      path: '/factlistX/:operator/:level',
      component: FactTableX
    },
    {
      path: '/chart/:type',
      component: Chart
    }
  ]
})
