// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
import store from './store'
import App from './App'
import VueResource from 'vue-resource'

import 'mint-ui/lib/style.css'
import 'assets/css/common.css'
import 'assets/css/swiper.min.css'


import Home from './components/home/Home'
import Cinema from './components/cinema/Cinema'
import Me from './components/me/Me'
import LazyLoad from './components/lazyload'
import MovieDetail from './views/MovieDetail'
import CinemaDetail from './components/cinema/cinemaDetail'

Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(LazyLoad)


const routes = [{
  path : '/',
  component: Home
},
  {
  path : '/cinema',
  component: Cinema
},
  {
    name:'detail',
    path : '/movie/detail/:id',
    component: MovieDetail
  },
  {
    name: 'cdetail',
    path: '/cinema/detail/:id',
    component: CinemaDetail
  },
  {
  path : '/me',
  component: Me
}];
const router = new VueRouter({
  // mode: 'history',  history模式
  routes
});
router.beforeEach((to, from, next) => {
  store._mutations.pushLoadStack[0]()
next()
})

router.afterEach(route => {
  document.body.scrollTop = 0
document.documentElement.scrollTop = 0
window.onscroll = null
setTimeout(() => {
  store._mutations.completeLoad[0]()
}, 100)
})
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
