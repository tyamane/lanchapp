import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AuthData:{
      accessToken: '',
      user : ''
    }
  },
  mutations: {
    set_auth_data(state, payload)
    {
      if (payload.session){
        state.AuthData.accessToken = payload.session.getAccessToken().getJwtToken();
        //state.AuthData.user = payload.session.getAccessToken().getUserName();
      }
      else{
        state.AuthData.accessToken = ""
        state.AuthData.user = ""
      }

    }
  },
  actions: {
  },
  modules: {
  }
})
