// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Login from './Login.vue'

import api from './api'

Vue.use(ElementUI)
Vue.use(api)

/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<Login/>',
  components: { Login }
})
