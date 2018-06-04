export const pageMinWidth = 1100 // 页面最小宽度
export const versionLogs = 'version: 1.0.10, 发布时间：2018.6.1 21:00'
// export const serverUrl = 'http://sales.dcstar-inc.com/sales' // server地址
// export const serverUrl = 'http://erp.zzcfo.cn/sales' // server地址
export const serverUrl = process.env.API_ROOT // server地址

console.log(process.env.API_ROOT, 'test----环境地址')
console.log(process.env.server_url, 'test-环境地址')

// 表单验证
const validatePhone = (rule, value, callback) => { // 自定义规则验证手机号
  let regPhone = /^1[3,4,5,7,8][0-9]{9}$/
  if (value === '') {
    callback(new Error('请输入您的手机号'))
  } else if (!regPhone.test(value)) {
    callback(new Error('请输入有效手机号!'))
  } else {
    callback()
  }
}
export const chartLengthRule = {
  defaultRule: [
    { // 通用规则 ，...[]方式加入
      min: 1,
      max: 20,
      message: '长度在 1 到 20 个字符',
      trigger: 'blur',
    }],
  validatePhone: {validator: validatePhone, trigger: 'blur'}, // 自定义规则验证手机号
}

// 分页
// export const pagesOptions = {
//   // layout: 'total,sizes, prev, pager, next, jumper', // 分页
//   layout: 'total, prev, pager, next, jumper', // 分页
//   pageSizes: [10, 20, 30, 40],
//   pageSize: 10,
// }
