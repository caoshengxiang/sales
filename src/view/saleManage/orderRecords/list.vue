<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
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
        <com-button buttonType="export" icon="el-icon-plus" :disabled="multipleSelection.length <= 0">导出</com-button>
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
          label="来自销售机会"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')">{{ scope.row.chanceName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="来自客户"
          prop="customerName"
          show-overflow-tooltip
          width="180">
          <!--<template slot-scope="scope">{{ scope.row.customerName }}</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          prop="followDesc"
          show-overflow-tooltip
          label="发布内容">
        </el-table-column>
        <el-table-column
          align="center"
          prop="creatorName"
          label="发布人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="销售阶段"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
          label="发布日期"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="tableDataTotal"
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
        dataLoading: false,
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
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
        this.getContactsList(this.currentPage, this.pagesOptions.pageSize)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getContactsList(this.currentPage, this.pagesOptions.pageSize)
      },
      handleRouter (name) {
        this.$router.push({name: 'salesOpportunitiesDetail', query: {view: name, id: 1}, params: {end: 'FE'}})
      },
      getContactsList (page, pageSize, type) {
        this.dataLoading = true
        API.orderRecords.list({
          page: page,
          pageSize: pageSize,
          type: type,
        }, (data) => {
          // this.ac_contactsList(data.data)
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          this.dataLoading = false
        }, (data) => {
          // this.ac_contactsList(data.data)
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          this.dataLoading = false
        })
      },
    },
    created () {
      this.getContactsList(this.currentPage, this.pagesOptions.pageSize)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
