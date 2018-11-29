import Vue from 'vue'

// echart
import echarts from 'echarts'
// 引入弹窗组件
import vDialogs from 'v-dialogs'

// meonment 作为全局方法
import moment from 'moment'
// vue-xlsx-table
import vueXlsxTable from 'vue-xlsx-table'
// 图片查看插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

// 拖拽排序
import vueDND from 'awe-dnd'

/* 自定义组件 */
// 引入行政区域下拉框联动组件
import AreaSelect from '../components/areaSelect'
// 按钮
import ComButton from './button'

Vue.use(vDialogs)
Vue.use(vueXlsxTable, {rABS: false}) // 浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.use(preview)
Vue.use(vueDND)
Vue.use(AreaSelect)
Vue.use(ComButton)
