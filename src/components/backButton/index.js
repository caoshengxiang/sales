/**
 * Created by YAO on 2018-04-07.
 */
import MyBackButton from './BackButton.vue'

const BackButton = {
  install: function (Vue) {
    Vue.component('BackButton', MyBackButton)
  },
}

// 导出组件
export default BackButton
