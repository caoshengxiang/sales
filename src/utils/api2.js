import '../utils/axiosConfig' // axios配置文件
// import { externalAPI } from './const'

export default {
  serviceManager: { // 管家
    list (params, success, error) { // 列表
      $axios.get('serviceManager', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) { // 管家详情
      $axios.get('serviceManager/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    updateDetail (params, success, error) { // 修改历史详细
      $axios.get('serviceManager/update/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  }
}
