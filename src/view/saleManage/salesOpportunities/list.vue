<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>销售机会</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-plus" @click="operateOptions('delete')">删除</com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="move" icon="el-icon-plus" @click="operateOptions('move')">转移</com-button>
      </div>
      <div class="com-bar-right">
        <el-select v-model="salesOpportunitiesOptionsType" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in salesOpportunitiesOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="salesOpportunitiesList"
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
          label="意向商品"
          width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名称"
          prop="customerName"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <!--<el-table-column
          align="center"
          prop="contacterName"
          label="联系人"
          width="160"
          show-overflow-tooltip>
          </el-table-column>-->
        <el-table-column
          align="center"
          prop="intentBillAmount"
          label="预计签单金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="billDate"
          label="预计签单日期"
          width="160"
          show-overflow-tooltip>
          <!--todo 需要处理时间 年月日-->
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="销售阶段"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="赢率"
          width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{item.percent}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="需求来源"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in demandSource" :key="item.type" v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="creatorName"
          label="需求创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="salerName"
          label="需求销售员"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="counselorName"
          label="需求咨询师"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="followDate"
          label="最近跟单记录"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="salesOpportunitiesTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>

    <!-- -->
    <!-- -->
    <!--新增弹窗-->
    <!--<add-dialog :addDialogOpen="addDialogOpen" @hasAddDialogOpen="addDialogOpen = false"></add-dialog>-->
    <!-- -->
    <!-- -->
    <!--转移弹窗-->
    <!--<move-dialog :moveDialogOpen="moveDialogOpen" @hasMoveDialogOpen="moveDialogOpen = false"></move-dialog>-->
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        // addDialogOpen: false,
        // moveDialogOpen: false,
        salesOpportunitiesOptionsType: 0,
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'demandSource',
        'salesOpportunitiesOptions',
      ]),
      ...mapState('salesOpportunities', [
        'salesOpportunitiesList',
        'salesOpportunitiesTotal',
      ]),
    },
    components: {
      comButton,
      addDialog,
      moveDialog,
    },
    methods: {
      ...mapActions('salesOpportunities', [
        'ac_salesOpportunitiesList',
      ]),
      operateOptions (op) {
        switch (op) {
          case 'add':
            // this.addDialogOpen = true
            this.$vDialog.modal(addDialog, {
              title: '新增销售机会',
              width: 900,
              height: 400,
              params: {
                salesState: this.salesState,
              },
              callback (data) {
                if (data.type === 'save') {
                  alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
          case 'move':
            // this.moveDialogOpen = true
            this.$vDialog.modal(moveDialog, {
              title: '转移销售机会',
              width: 500,
              height: 200,
              params: {
                // id: '123456',
              },
              callback (data) {
                if (data.type === 'save') {
                  alert('弹窗关闭，添加成功刷新列表')
                }
              },
            })
            break
          case 'delete':
            this.$confirm('确定删除销售机会, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getSalesOpportunititeisList (page, pageSize, type) { // 获取列表
        this.dataLoading = true
        API.salesOpportunitiesList({
          page: page,
          pageSize: pageSize,
          type: type,
        }, (data) => {
          this.ac_salesOpportunitiesList(data.data)
          this.dataLoading = false
        }, (data) => {
          this.ac_salesOpportunitiesList(data.data)
          this.dataLoading = false
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getSalesOpportunititeisList(this.currentPage, this.pagesOptions.pageSize, this.salesOpportunitiesOptionsType)
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getSalesOpportunititeisList(this.currentPage, this.pagesOptions.pageSize, this.salesOpportunitiesOptionsType)
      },
      handleRouter (name, id) {
        this.$router.push({name: 'salesOpportunitiesDetail', query: {view: name, id: id}, params: {end: 'FE'}})
      },
      searchHandle () {
        this.getSalesOpportunititeisList(this.currentPage, this.pagesOptions.pageSize, this.salesOpportunitiesOptionsType)
      }
    },
    created () {
      this.getSalesOpportunititeisList(this.currentPage, this.pagesOptions.pageSize, this.salesOpportunitiesOptionsType)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
