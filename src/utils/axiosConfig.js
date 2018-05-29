import { serverUrl } from './const'
// import { Message, Loading } from 'element-ui'
import { Message } from 'element-ui'
import webStorage from 'webStorage'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 100000
// $axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8'
$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
let timer = setInterval(() => {
  if (webStorage.getItem('userInfo')) {
    clearInterval(timer)
    $axios.defaults.headers.common['authKey'] = webStorage.getItem('userInfo').authKey
  }
}, 10)

// 添加一个请求拦截器
// let loadinginstace
$axios.interceptors.request.use((config) => {
  // TODO 考虑做全局loading效果，（注意html,body高度设为100%）
  // loadinginstace = Loading.service({
  //   fullscreen: true,
  //   background: 'rgba(0, 0, 0, 0.4)'
  // })
  return config
}, (error) => {
  // 当出现请求错误是做一些事
  // loadinginstace.close()
  Message.error({
    message: '加载超时',
  })
  return Promise.reject(error)
})

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
  //   loadinginstace.close()
  // }, 1000)
  return Promise.resolve(response)
}, (error) => {
  // 对返回的错误进行一些处理
  // loadinginstace.close()
  Message.error({
    message: '好像发生了一点错误,需要检查！定位->' + error,
  })
  return Promise.reject(error)
})
