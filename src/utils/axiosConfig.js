import { serverUrl } from './const'
import { Message } from 'element-ui'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 100000
// $axios.defaults.headers = {'X-Custom-Header': 'foobar'}
// $axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded'

//添加一个返回拦截器
$axios.interceptors.response.use((response) => {
  //对返回的数据进行一些处理
  // console.log(response)
  if (!response.data.status) { // 后台返回错误
    Message.error(response.data.error.message)
  }
  return response
}, (error) => {
  //对返回的错误进行一些处理
  return Promise.reject(error)
})
