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
        <com-button buttonType="delete" icon="el-icon-delete" @click="operateOptions('delete')"
                    :disabled="multipleSelection.length <= 0">删除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="orange" @click="operateOptions('move')"
                    :disabled="multipleSelection.length <= 0"><i class="el-icon-sort" style="transform: rotate(90deg)"></i> 转移
        </com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <el-select v-model="salesOpportunitiesOptionsType" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in salesOpportunitiesOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 1"><!--后端-->
        <el-select
          v-model="organizationId"
          @change="searchHandle"
          placeholder="请选择组织" class="com-el-select" style="width: 200px">
          <el-option label="全部组织的销售机会" :value="null"></el-option>
          <el-option
            v-for="item in organizationOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="salesOpportunitiesList"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="intentProductName"
          label="意向商品"
          width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName || '无名'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          label="客户名称"
          prop="customerName"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter2('detail', scope.row.customerId)">{{ scope.row.customerName }}</a>
          </template>
        </el-table-column>
        <!--要求去掉了列表的联系人-->
        <!--<el-table-column
          align="center"
          prop="contacterName"
          label="联系人"
          width="160"
          show-overflow-tooltip>
          </el-table-column>-->
        <el-table-column
          align="center"
          sortable="custom"
          prop="intentBillAmount"
          label="预计签单金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="billDate"
          label="预计签单日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.billDate && $moment(scope.row.billDate).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="stage"
          label="销售阶段"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
            <!--<span v-if="scope.row.stage === -1">输单</span>-->
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="stage"
          label="赢率"
          width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type"
                  v-if="item.type === scope.row.stage">{{item.percent}}</span>
            <!--<span v-if="scope.row.stage === -1">0%</span>-->
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="source"
          label="需求来源"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in demandSource" :key="item.type"
                  v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="creatorName"
          label="需求创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="salerName"
          label="需求销售员"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="counselorName"
          label="需求咨询师"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="followDate"
          label="最近跟单记录"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          v-if="themeIndex === 1"
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="organizationName"
          label="所属组织"
          width="160">
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
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'
  import { arrToStr, underscoreName } from '../../../utils/utils'
  import advancedSearch from './advancedSearch'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        salesOpportunitiesOptionsType: null,
        multipleSelection: [],
        currentPage: 1,
        customerId: null, // 路由参数中得客户id
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
        sortObj: null, // 排序
        advancedSearch: null, // 高级搜索
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'demandSource',
        'salesOpportunitiesOptions',
        'themeIndex',
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
        let that = this
        switch (op) {
          case 'add':
            this.$vDialog.modal(addDialog, {
              title: '新增销售机会',
              width: 900,
              height: 400,
              params: {
                salesState: this.salesState,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunititeisList()
                }
              },
            })
            break
          case 'move':
            this.$vDialog.modal(moveDialog, {
              title: '转移销售机会',
              width: 500,
              height: 240,
              params: {
                multipleSelection: this.multipleSelection,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunititeisList()
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
              this.dataLoading = true
              API.salesOpportunities.delete(arrToStr(this.multipleSelection, 'id'), (data) => {
                if (data.status) {
                  if (data.data.fail > 0) {
                    this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                  }
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getSalesOpportunititeisList()
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
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
      getSalesOpportunititeisList () { // 获取列表
        this.dataLoading = true
        this.getQueryParams()
        API.salesOpportunities.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          this.ac_salesOpportunitiesList(data.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getSalesOpportunititeisList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getSalesOpportunititeisList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'salesOpportunitiesDetail', query: {view: name, id: id}, params: {end: 'FE'}})
      },
      handleRouter2 (name, id) {
        this.$router.push({name: 'customersDetail', query: {view: name, customerId: id}, params: {end: 'FE'}})
      },
      searchHandle () {
        this.getSalesOpportunititeisList()
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getSalesOpportunititeisList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
            demandSource: this.demandSource,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getSalesOpportunititeisList()
            }
          },
        })
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.salesOpportunitiesOptionsType, // 前端
          organizationId: this.organizationId // 后端
        }
        if (this.customerId) { // 更多
          this.defaultListParams.customerId = this.customerId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
    },
    created () {
      this.getSalesOpportunititeisList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
