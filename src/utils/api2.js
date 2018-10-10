import '../utils/axiosConfig' // axios配置文件
// import { externalAPI } from './const'

export default {
  serviceManager: {
    list (params, success, error) {
      $axios.get('serviceManager', {
        params: params,
      }).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
    detail (params, success, error) {
      $axios.get('serviceManager/' + params).then(res => {
        success && success(res.data)
      }).catch(err => {
        error && error(err)
      })
    },
  }
}
