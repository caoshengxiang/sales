import Vue from 'vue'

// 表格组件
// import vueXlsxTable from 'vue-xlsx-table'
// 引入返回按钮组件
// import BackButton from 'backButton'
// 引入行政区域下拉框联动组件
// import AreaSelect from 'areaSelect'
// 引用申请审核流程组件
// import AuditProcess from 'auditProcess'
// 引用权限按钮组件
// import PermissionButton from 'permissionButton'
// 引用全局配置插件
// import GlobalConfig from 'globalConfig'

// echart
import echarts from 'echarts'
// 引入弹窗组件
import vDialogs from 'v-dialogs'
// 引入行政区域下拉框联动组件
import AreaSelect from '../components/areaSelect'
// meonment 作为全局方法
import moment from 'moment'

Vue.use(AreaSelect)
Vue.use(vDialogs)

// Vue.use(vueXlsxTable, {rABS: false})
// Vue.use(BackButton)
// Vue.use(AreaSelect)
// Vue.use(AuditProcess)
// Vue.use(PermissionButton)
// Vue.use(GlobalConfig)
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment

// todo main.js 中引入
// todo cnpm install --save vue-xlsx-table echarts
