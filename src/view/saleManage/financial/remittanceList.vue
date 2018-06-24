<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>财务管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>佣金结算管理</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="addHandle">完成审核</com-button>
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
          label="来自订单"
          prop="name"
          width="90"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="来自客户"
          width="115px"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="客户联系人"
          width="115"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单销售商品"
          width="120"
          >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="商品规格数量"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="款项名称"
          width="90"
          >
        </el-table-column>
            <el-table-column
              align="center"
              label="回款金额"
              width="90"
            >
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
        <el-table-column
          align="center"
          label="回款日期"
          width="90"
      >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="回款审核状态"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="审核日期"
          width="90"
        >
        </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="是否续费"
            width="90"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="返佣方式"
            width="90"
          >
          </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="返佣主体"
              width="90"
            >
            </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="销售人员"
        >
          <el-table-column
            align="center"
            prop="name"
            label="需求所有人"
            width="115"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销售跟进人"
            width="115"
          >
        </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销售咨询师"
            width="115"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="管理人员"
        >

          <el-table-column
            align="center"
            prop="name"
            label="大区总监"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="金额"
            width="90"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="区域经理"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="金额"
            width="90"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="培训师"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="金额"
            width="90"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="销售助理"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="金额"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="营销副总"
            width="90"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="金额"
            width="90"
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
            label: '全部汇款记录',
          }, {
            value: 2,
            label: '我负责的订单汇款记录',
          }, {
            value: 3,
            label: '我参与的订单汇款记录',
          }, {
            value: 3,
            label: '我跟单的订单汇款记录',
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
