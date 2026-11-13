import Vue from 'vue'
import Router from 'vue-router'
import FrontPage from '@/components/FrontPage'
import GridCard from '@/components/GridCard'
import MainMenu from '@/components/MainMenu'
import SubMenu from '@/components/SubMenu'
import TestCard from '@/components/TestCard'
import FactTable from '@/components/FactTable'
import Scores from '@/components/Scores'
import GridFacts from '@/components/GridFacts'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: FrontPage
    },
    {
      // The whole table in one sitting, which the level menu's last tile
      // opens. It had a menu of its own, behind a screen that asked Steps
      // or Grid; both are gone.
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
      path: '/scores',
      component: Scores
    },
    // Screens that have been taken out, and any other old link, land on the
    // name screen rather than on a blank page.
    {
      path: '*',
      redirect: '/'
    }
  ]
})
