<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>佣金结算管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="addHandle">完成审核</com-button>
      </div>
      <div class="com-bar-right">
        <el-form :model="searchForm" inline>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.clearMonth"
              type="month"
              placeholder="选择日期"
              :editable="false"
              format="yyyyMM">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <com-button buttonType="search" @click="getRoleList">搜索</com-button>
            <com-button buttonType="export" icon="el-icon-download">导出</com-button>
          </el-form-item>
        </el-form>
        <!--<el-select v-model="queryParam.organizationId" placeholder="请选择" class="com-el-select" style="width:180px">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option-->
            <!--v-for="item in organizationOptions"-->
            <!--:key="item.id"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
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
              label="结算状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="佣金结算类型"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="来自订单"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="订单客户"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="订单销售商品"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="款项名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="回款金额"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="合计收支"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              label="签约主体"
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
  import { mapState } from 'vuex'
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        organizationOptions: [],
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
        searchForm:{
          organizationId: ""
        }
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
  created(){
    this.getOrganization({pid: 1})
  },
    methods: {
      handleSizeChange (val) {

      },
      handleCurrentChange (val) {
        this.currentPage = val;
      },
      addHandle () {
        alert('add btn')
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      }
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
