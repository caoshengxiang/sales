<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>跟单记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="export" icon="el-icon-plus">导出</com-button>
        <!--<com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>-->
        <!--<com-button buttonType="move" icon="el-icon-plus" @click="moveHandle">转移</com-button>-->
      </div>
      <div class="com-bar-right">
        <!--<el-select v-model="value" placeholder="请选择" class="com-el-select">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<com-button buttonType="search">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名称"
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')">{{ scope.row.customerName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          width="160"
          show-overflow-tooltip>
        </el-table-column>

      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { pagesOptions } from '../../../utils/const'
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'list',
    data () {
      return {
        options: [
          {
            value: 1,
            label: '全部客户',
          }, {
            value: 2,
            label: '我负责的客户',
          }, {
            value: 3,
            label: '我更进的客户',
          }, {
            value: 4,
            label: '我参与的客户',
          }],
        value: 3,
        tableData: [
          {
            customerName: '财税金融全托管',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            customerName: '财税金融全托管',
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }],
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      pagesOptions () {
        return pagesOptions
      },
    },
    components: {
      comButton,
    },
    methods: {
      addHandle () {
        alert('add btn')
      },
      moveHandle () {
        alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      handleRouter (name) {
        this.$router.push({name: 'salesOpportunitiesDetail', query: {view: name}})
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
