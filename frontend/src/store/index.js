import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import connection from './modules/connection'
import settings from './modules/settings'
import query from './modules/query'

// Vuex with VuexPersistence. The state gets saved as an json object inside localStorage.
// See "https://github.com/championswimmer/vuex-persist#readme"
Vue.use(Vuex)

const options = {
  modules: ['connection', 'settings'] // Modules which are stored in localStorage
}

export default new Vuex.Store({
  modules: {
    connection,
    settings,
    query
  },
  plugins: [new VuexPersistence(options).plugin]
})