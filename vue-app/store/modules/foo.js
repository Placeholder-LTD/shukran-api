// store/modules/foo.js
export default {
    namespaced: true,
  
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      count: 0
    }),
  
    actions: {
      inc: ({ commit }) => commit('inc')
    },
  
    mutations: {
      inc: state => state.count++
    }
}

/**
 * In a large application, our Vuex store will likely be split into multiple modules. Of course, it is also possible to code-split these modules into corresponding route component chunks. Suppose we have the following store module:
 */