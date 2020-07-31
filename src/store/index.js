import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queriedCode: 0,
    queriedHistory: [],
    weatherData: {},
    weatherDump: {}
  },
  mutations: {
    storeCode: function(state, postalCode) {
      state.queriedHistory.push = state.queriedCode
      state.queriedCode = postalCode
    }
  },
  actions: {
    updateCode: function ({ commit, state }, postalCode) {
      return new Promise( resolve => {
        // Vue.$log.info(">> Updating Date Ranges")
      })
    }
  },
  modules: {
  }
})
