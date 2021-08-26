// app.js
const Vue = require('vue') // import Vue from 'vue'
const App = require('./App.vue') // import App from './App.vue'
const { createRouter } = require('./router') // import { createRouter } from './router'
const { createStore } = require('./store') // import { createStore } from './store'
const { sync } = require('vuex-router-sync') // import { sync } from 'vuex-router-sync'

module.exports = function oldCreateApp (context) {
  /**
     * So, instead of directly creating an app instance, 
     * we should expose a factory function that can be repeatedly 
     * executed to create fresh app instances for each request:
     * https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons
     * 
     * 
     * The same rule applies to router, store and event bus instances 
     * as well. Instead of exporting it directly from a module 
     * and importing it across your app, you need to create 
     * a fresh instance in createApp and inject it from the 
     * root Vue instance.
     */
   const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`,
  });

  return app
}

module.exports =  function createApp () {
    // create router and store instance
    const router = createRouter()
    const store = createStore()

    // sync so that route state is available as part of the store
    sync(store, router)
  
    const app = new Vue({
      // inject router into root Vue instance
      router,
      store,
      render: h => h(App)
    })
  
    // return the app, store and the router
    return { app, router, store }
}

// https://ssr.vuejs.org/guide/build-config.html#client-config