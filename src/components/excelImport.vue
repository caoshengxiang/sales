<!--表格导入组件封装 2018.4.1 姚政伟创建
====================调用说明================
import excelImport from '@/components/excelImport.vue';
components: {
      excelImport
}
<excelImport ref="excelImportApp"></excelImport>
===================回调方法（获取导入数据）==========
             this.$ref.excelImportApp.getExcelData();//JSON对象
-->
<template>
  <div id="excelImportApp">
    <vue-xlsx-table @on-select-file="handleSelectedFile">导入</vue-xlsx-table>
  </div>
</template>

<script>
  export default {
    name: 'excelImportApp',
    data () {
      return {
        excelData: null,
      }
    },
    methods: {
      handleSelectedFile (convertedData) {
        this.excelData = convertedData.body
      },
      getExcelData () {
        return this.excelData
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
