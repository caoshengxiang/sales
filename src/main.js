// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './element_ui'
import './styles/basic.scss'
import './components/register'

Vue.config.productionTip = false // 关闭生产模式下给出的提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
  // render: h => h(App)
})
