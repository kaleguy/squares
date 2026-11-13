import Vue from 'vue'
import Router from 'vue-router'
import FrontPage from '@/components/FrontPage'
import Home from '@/components/Home'
import GridMenu from '@/components/GridMenu'
import GridCard from '@/components/GridCard'
import MainMenu from '@/components/MainMenu'
import SubMenu from '@/components/SubMenu'
import TestCard from '@/components/TestCard'
import FactTable from '@/components/FactTable'
import Chart from '@/components/Chart'
import GridFacts from '@/components/GridFacts'
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
      path: '/gridfacts/:operator',
      component: GridFacts
    },
    {
      path: '/main/',
      component: MainMenu
    },
    {
      // Help is scoped to the screen that opened it: /help/steps, /help/grid.
      path: '/help/:section',
      component: Help
    },
    {
      path: '/help',
      component: Help
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
    },
    // The fact list used to live on its own routes. A link kept from then
    // should land on the name screen rather than on a blank page.
    {
      path: '*',
      redirect: '/'
    }
  ]
})
