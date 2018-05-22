import { serverUrl } from './const'
import { Message } from 'element-ui'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 100000
// $axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8'
$axios.defaults.headers.common['authKey'] = '1234567890' // todo 改为实际authKey
$axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

// 添加一个返回拦截器
$axios.interceptors.response.use((response) => {
  // 对返回的数据进行一些处理
  console.log(response)
  if (!response.data.status) { // 后台返回错误
    setTimeout(() => {
      Message.error(response.data.error.message)
    }, 1000)
  }
  // setTimeout(() => {
  return response
  // }, 300)
}, (error) => {
  // 对返回的错误进行一些处理
  console.error(error)
  return Promise.reject(error)
})
