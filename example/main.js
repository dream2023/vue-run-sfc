import Vue from 'vue'
import App from './App.vue'
import VueRunSfc from '../src/index'

Vue.config.productionTip = false

Vue.use(VueRunSfc, {
  cssLabs: ['https://unpkg.com/normalize.css@8.0.1/normalize.css'],
  row: false,
  reverse: true,
  height: '400px'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
