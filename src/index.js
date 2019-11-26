import VueRunSfc from './vue-run-sfc'

const install = function (Vue, options = {}) {
  Vue.component('vue-run-sfc', VueRunSfc)
  Vue.prototype.$VueRunSfcParams = options
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
