// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './element_ui' // element
import './styles/basic.scss' // 基础样式
import './components/register' // 全局注册组件
import { versionLogs } from './utils/const'

Vue.config.productionTip = false // 关闭生产模式下给出的提示

// 防止按键盘空格键和确定但模态框弹出多个
document.onkeydown = function() { 
	// if(window.event.keyCode==13 || window.event.keyCode== 32) {
	if(window.event.keyCode== 32) {
		// console.log(window.event.keyCode)
		window.event.preventDefault(); 
	}
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  // render: h => h(App)
})

console.log(`detail: ${versionLogs}`)
