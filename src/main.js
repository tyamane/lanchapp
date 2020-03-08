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
  render: h => h(App)
}).$mount('#app')
