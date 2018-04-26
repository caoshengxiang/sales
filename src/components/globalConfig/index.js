/**
 * 全局配置
 * Created by YAO on 2018-04-07.
 */
import webStorage from 'webStorage'

const globalConfig = {
  install: function (Vue) {
    var userInfo = webStorage.getItem('userInfo')
    var isShowTibetan = ''
    if (userInfo && userInfo.type === 1) {
      isShowTibetan = ' tibetan '
    }
    Vue.prototype.globalData = {
      isShowTibetan: isShowTibetan,
    }
  },
}

// 导出组件
export default globalConfig
