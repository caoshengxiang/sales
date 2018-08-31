import Vue from 'vue'

// echart
import echarts from 'echarts'
// 引入弹窗组件
import vDialogs from 'v-dialogs'
// 引入行政区域下拉框联动组件
import AreaSelect from '../components/areaSelect'
// meonment 作为全局方法
import moment from 'moment'
// vue-xlsx-table
import vueXlsxTable from 'vue-xlsx-table'
// 图片查看插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(AreaSelect)
Vue.use(vDialogs)
Vue.use(vueXlsxTable, {rABS: false}) // 浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.use(preview)
