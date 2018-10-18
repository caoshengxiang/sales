/*
* 部署需要配置得变量 start
* 二维码前缀
* 二维码前缀,打包需要更改
* */
// 本地测试地址
// export const activityCodePre = 'http://192.168.0.109:8080/#/activityAddCustomer/index?'
// export const agentRegister = 'http://192.168.0.109:8080/#/account/registe?'

// 微信测试地址
export const activityCodePre = 'http://king.dcstar-inc.com/#/activityAddCustomer/index?'
export const agentRegister = 'http://king.dcstar-inc.com/#/account/registe?'

// 微信正式地址
// export const activityCodePre = 'http://jys.zzcfo.cn/#/activityAddCustomer/index?'
// export const agentRegister = 'http://jys.zzcfo.cn/#/account/registe?'

/*
* 部署需要配置得变量 end
* */

export const pageMinWidth = 1100 // 页面最小宽度
export const versionLogs = 'version: 1.0.0，20180723'
export const serverUrl = process.env.API_ROOT // server地址
export const externalAPI = process.env.API_EXTERNAL // APP 外部地址

console.log(process.env.API_ROOT, 'test----环境地址')
console.log(process.env.API_EXTERNAL, 'test APP----环境地址')

// 表单验证
const validatePhone = (rule, value, callback) => { // 自定义规则验证手机号
  // let regPhone = /^1[3,4,5,7,8][0-9]{9}$/
  let regPhone = /^[0-9]{11}$/
  if (value === '') {
    callback(new Error('请输入您的手机号'))
  } else if (!regPhone.test(value)) {
    callback(new Error('请输入有效手机号!'))
  } else {
    callback()
  }
}
// 不能选以前的时间验证
const validateBeforeTime = (rule, value, callback) => { // 自定义规则验证手机号,Date对象格式
  let currentDate = new Date()
  if (Date.parse(value) < Date.parse(currentDate)) {
    callback(new Error('请正确选择时间'))
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
  validateBeforeTime: {validator: validateBeforeTime, trigger: 'change'}, // 自定义规则验证以前的时间
}

// 分页
// export const pagesOptions = {
//   // layout: 'total,sizes, prev, pager, next, jumper', // 分页
//   layout: 'total, prev, pager, next, jumper', // 分页
//   pageSizes: [10, 20, 30, 40],
//   pageSize: 10,
// }
