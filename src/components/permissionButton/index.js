/**
 * Created by YAO on 2018-04-07.
 */
import MyPermissionButton from './PermissionButton.vue'

const PermissionButton = {
  install: function (Vue) {
    Vue.component('PermissionButton', MyPermissionButton)
  },
}

// 导出组件
export default PermissionButton
