import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import '@/icons' // icon
import '@/permission' // 权限
import App from './App'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import permission from '@/directive/permission'
import stat from '@/directive/stat'

Vue.use(Meta)
Vue.use(ElementUI)
Vue.use(permission)
Vue.use(stat)
Vue.config.productionTip = false

sync(store, router)
if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://c8c5e8f8e738412aab393d5c037720b8@sentry.uniqueway.cc/4')
    .addPlugin(RavenVue, Vue)
    .install()
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
