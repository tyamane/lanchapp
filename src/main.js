import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cognito from './cognito'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  cognito,
  render: h => h(App),
  created : function()
  {
    console.log(store.state.AuthData)
    cognito.isAuthenticated()
        .then(session => {
          store.commit('set_auth_data',{session: session})
        })
        .catch( () => {
          store.commit('set_auth_data',{session: null})
        })
  }
}).$mount('#app')
