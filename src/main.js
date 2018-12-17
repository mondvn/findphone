// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'
import vueXlsxTable from 'vue-xlsx-table'
import md5 from 'js-md5'

Vue.use(VueSession)
Vue.use(vueXlsxTable, {rABS: false})
Vue.prototype.md5 = md5
Vue.config.productionTip = false
Vue.prototype.appName = '123456'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
