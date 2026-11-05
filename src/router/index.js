import Vue from 'vue'
import Router from 'vue-router'
import FrontPage from '@/components/FrontPage'
import Home from '@/components/Home'
import GridMenu from '@/components/GridMenu'
import GridCard from '@/components/GridCard'
import MainMenu from '@/components/MainMenu'
import SubMenu from '@/components/SubMenu'
import DiceMenu from '@/components/DiceMenu'
import TestCard from '@/components/TestCard'
import FactTable from '@/components/FactTable'
import Chart from '@/components/Chart'
import Help from '@/components/Help'

Vue.use(Router)

// const foo = { template: '<h1>hi</h1>' }

export default new Router({
  routes: [
    {
      path: '/',
      component: FrontPage
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/grid/',
      component: GridMenu
    },
    {
      path: '/gridcard/:operator',
      component: GridCard
    },
    {
      path: '/main/',
      component: MainMenu
    },
    {
      path: '/help',
      component: Help
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
      path: '/chart/:type',
      component: Chart
    }
  ]
})
