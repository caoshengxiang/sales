<!--表格导出组件封装 2018.4.1 姚政伟创建
====================调用说明================
import excelExport from '@/components/excelExport.vue';
components: {
      excelExport
}
<excelExport name="导出" exportTableDomId="#exportTable" exportTableName="导出表格文件保存名称"></excelExport>
===================回调方法（获取导入数据）==========
             无
-->
<template>
  <el-button @click="exportExcel">
    <slot>导出</slot>
  </el-button>
</template>

<script>
  // import server from '@/common/server.js'
  import { Message } from 'element-ui'

  export default {
    name: 'excelExportApp',
    props: {
      // 类型
      // 对应相关列表查询的单词，举例说明 获取宗教活动场所列表接口为http://{{precision}}/precision/activityPlace，
      // 其对应{{excelType}}为activityPlace
      excelType: {
        type: String,
        required: true,
        default: '',
      },
      paramArray: {
        type: Array,
        required: false,
        default: () => {
          return []
        },
      },
    },
    methods: {
      exportExcel () {
        var that = this

        that.$confirm('确认导出Excel表格吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          if (that.excelType === '') {
            Message({
              showClose: true,
              message: '导出配置参数错误！excelType未找到！',
              type: 'error',
            })
            return
          }
          // server.exportExcel(that.excelType, that.paramArray)
        }).catch(() => {

        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
