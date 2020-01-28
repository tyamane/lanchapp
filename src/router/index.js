import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue' // added
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue) // added

import 'bootstrap/dist/css/bootstrap.css' //added
import 'bootstrap-vue/dist/bootstrap-vue.css' // added

import test1 from '@/components/test1'
import test2 from '@/components/test2'
import test3 from '@/components/test3'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2
  },
  {
    path: '/test3',
    name: 'test3',
    component: test3
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
