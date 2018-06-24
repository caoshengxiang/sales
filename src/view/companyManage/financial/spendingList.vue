<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>财务支出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="addHandle">完成审核</com-button>
        <com-button buttonType="add" @click="addHandle">完成打款</com-button>
      </div>
      <div class="com-bar-right">
        <el-select v-model="value" placeholder="请选择" class="com-el-select" style="width:180px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          prop="id"
          reserve-selection=""
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          label="返佣账期"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="返佣对象"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="合计返佣金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="返佣状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="返佣结算日期"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="销售佣金"
        >

          <el-table-column
            align="center"
            prop="name"
            label="需求提供人"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="需求跟进人"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销售咨询师"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="管理佣金"
        >
          <el-table-column
            align="center"
            prop="name"
            label="大区总监"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="区域经理"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="培训师"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销售助理"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="营销副总"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="服务佣金"
        >

          <el-table-column
            align="center"
            prop="name"
            label="服务佣金"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="服务补贴"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="服务奖励"
          >
          </el-table-column>
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
  import { mapState } from 'vuex'
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'list',
    data () {
      return {
        options: [
          {
            value: 1,
            label: '成都凡特塞科技有限公司',
          }, {
            value: 2,
            label: '税务一分公司',
          }, {
            value: 3,
            label: '税务二分公司',
          }],
        value: 1,
        tableData: [
          {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 1
          }, {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 2
          }, {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 3
          }],
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
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
        this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: name}})
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .link {
    color: #00A7FE;
    text-decoration: underline;
    cursor: pointer;
  }
  .button {
    padding: 5px 10px;
    color: #fff;
    border-radius: 3px;
    background-color: #4BCF99;
    cursor: pointer;
  }
</style>
