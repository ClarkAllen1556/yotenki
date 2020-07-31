import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLogger from 'vuejs-logger'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './styles/custom.scss'

const isProduction = process.env.NODE_ENV === 'production';
const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '>>',
  showConsoleColors: true
};

Vue.use(VueLogger, options)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
