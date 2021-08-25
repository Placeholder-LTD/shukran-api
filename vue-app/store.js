// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Assume we have a universal API that returns Promises
// and ignore the implementation details
// import { creatorProfilePreview } from '../controllers/socialMediaController' // would need to maybe abstract this, google node_modules dependencies is causing webpack bundling to fail. And declaring this as a dependency is causing the file size to be large.

export function createStore () {
  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      items: {}
    }),

    actions: { // needs work
      /* fetchItem ({ commit }, id) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return creatorProfilePreview(id).then(item => {
          commit('setItem', { id, item })
        })
      } */
    },

    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}