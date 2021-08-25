// runs in browser only

import { createApp } from './app'

// client-specific bootstrapping logic...

const { app, router } = createApp()

if (window.__INITIAL_STATE__) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window.__INITIAL_STATE__)
}

// this assumes App.vue template root element has `id="app"`
router.onReady(() => {
    app.$mount('#app')
    // Force hydration of the app (pass true)
    // app.$mount('#app', true)
})