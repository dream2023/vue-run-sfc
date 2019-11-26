import Vue from 'vue'
import App from './App.vue'
import VueRunSfc from '../src/index'

Vue.config.productionTip = false

Vue.use(VueRunSfc)

new Vue({
  render: h => h(App)
}).$mount('#app')
