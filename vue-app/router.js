// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
    { path: '/test', component: () => import('./components/Sample.vue') },
    // { path: '/test/item/:id', component: () => import('./components/Support.vue') }
    ]
  })
}