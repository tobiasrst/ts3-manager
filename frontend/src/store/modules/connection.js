import Vue from 'vue'

const state = {
  connected: false,
  token: '',
  serverId: null,
}

const mutations = {
  saveToken(state, token) {
    state.token = token
  },
  isConnected(state, status) {
    state.connected = status
  },
  setServerId(state, id) {
    state.serverId = id
  }
}

const actions = {
  clearConnection({commit}) {
    commit('isConnected', false)
    commit('saveToken', '')
    commit('setServerId', null)
  }
}

export default {
  state,
  mutations,
  actions
}
