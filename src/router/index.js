/* eslint-disable no-unused-vars */
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

import HelloWorld from '@/components/HelloWorld'
import cognito from '@/cognito'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Confirm from '@/components/Confirm'
import MainPage from '@/components/MainPage'
import Order from '@/components/Order'
import Profile from '@/components/Profile'

const requireAuth = (to, from, next) => {
  cognito.isAuthenticated()
    .then(session => {
      next()
    })
    .catch(session => {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    })
}
const logout = (to, from, next) => {
  cognito.logout()
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
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
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/singup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm
  },
  { path: '/logout',
    beforeEnter: logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
