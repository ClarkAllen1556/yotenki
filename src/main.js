import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import VueLogger from 'vuejs-logger'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './styles/custom.scss'


/**
 * For map icons
 */
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// --

/**
 * Vue Logger
 */
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
// --

Vue.use(VueI18n)
Vue.use(VueLogger, options)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/**
 * i18n locales
 */
import { EN_TRANSLATION } from './locales/en'
import { JP_TRANSLATION } from './locales/jp'

const TRANSLATIONS = {
  EN: EN_TRANSLATION,
  JP: JP_TRANSLATION
}

const i18n = new VueI18n({
  locale: 'JP',
  messages: TRANSLATIONS
})
// --

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
