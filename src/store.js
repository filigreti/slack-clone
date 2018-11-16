import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


   const state = {
    currentUser: null,
    currentChannel: null,
    isPrivate: false
  }
 const mutations = {
  SET_USER(state, user){
    state.currentUser = user
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel
  },
  SET_PRIVATE(state, isPrivate) {
    state.isPrivate = isPrivate
  }
  }
  const actions = {
    setUser(state, user) {
      state.commit('SET_USER', user)
    },
    setCurrentChannel({commit}, channel){
      commit('SET_CURRENT_CHANNEL', channel)
    },
    setPriate({commit}, isPrivate){
      commit("SET_PRiVATE", isPrivate)
    }
  }
  const getters = {
    currentUser: state => state.currentUser,
    currentChannel: state => state.currentChannel,
    isPrivate: state => state.isPrivate
  };
  const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

  })

  export default store
