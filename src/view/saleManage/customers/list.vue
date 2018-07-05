<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.toName"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.toName"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>
        <com-button buttonType="orange" @click="moveHandle"
                    :disabled="multipleSelection.length !== 1"><i class="el-icon-sort"
                                                                  style="transform: rotate(90deg)"></i> 转移
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-back" @click="returnHighSeaHandle"
                    :disabled="multipleSelection.length !== 1">退回公海池
        </com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <el-select v-model="customerType" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in customerTypeOptions"
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
          <el-option label="全部组织的客户" :value="null"></el-option>
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
        :data="customerList"
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
        <!--sortable="custom"="custom"-->
        <el-table-column
          align="center"
          sortable="custom"
          label="客户名称"
          prop="name"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="营业执照"
          prop="businessLicense"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="level"
          label="客户级别"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="industry"
          label="客户行业"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="provinceName"
          label="客户地区"
          width="160">
          <template slot-scope="scope">
            {{ scope.row.provinceName }}
            {{ scope.row.cityName }}
            {{ scope.row.areaName }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="website"
          label="客户网站"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="phone"
          label="联系电话"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="seaName"
          label="所属公海"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="source"
          sortable="custom"
          label="客户来源"
          width="160">
          <template slot-scope="scope">
            <span v-for="item in customerSourceType"
                  :key="item.type"
                  v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="creatorName"
          label="创建人"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="销售人"
          width="160">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.salerList"
                  :key="item.salerId"><span v-if="index > 0">、</span>{{item.salerName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160">
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="state"
          label="状态"
          width="160">
          <template slot-scope="scope">
            <span v-for="item in customerState"
                  :key="item.type"
                  v-if="scope.row.state === item.type">{{item.value}}</span>
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
        :total="customerTotal"
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
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'
  import returnPoll from './returnPoll'
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../utils/utils'
  // import webStorage from 'webStorage'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: true,
        multipleSelection: [],
        customerType: null, // 客户选项
        currentPage: 1, // 当前页
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
        'customerTypeOptions',
        'customerSourceType',
        'customerState',
        'pagesOptions',
        'customerAddSource',
        'themeIndex',
      ]),
      ...mapState('customer', [
        'customerList',
        'customerTotal',
      ]),
    },
    components: {
      comButton,
      addDialog,
      moveDialog,
    },
    methods: {
      ...mapActions('customer', [
        'ac_customerList',
      ]),
      // moment (Timestamps, str) {
      //   return moment(Timestamps).format(str)
      // },
      getCustomerList () { // 获取列表数据
        this.getQueryParams()
        this.dataLoading = true
        API.customer.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (res) => {
          this.ac_customerList(res.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 300)
        }, () => {
          // setTimeout(() => {
          //   this.dataLoading = false
          // }, 300)
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getCustomerList()
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
        this.getCustomerList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            customerSourceType: this.customerSourceType,
            customerState: this.customerState,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getCustomerList()
            }
          },
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCustomerList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'customersDetail', query: {view: name, customerId: id}, params: {end: 'FE'}})
      },
      addHandle () {
        let that = this
        this.$vDialog.modal(addDialog, {
          title: '新增客户',
          width: 900,
          height: 410,
          params: {
            customerAddSource: this.customerAddSource,
            pageSource: 1, // 1:客户管理模块 2:客户公海模块
          },
          callback (data) {
            if (data.type === 'save') {
              that.getCustomerList()
            }
          },
        })
      },
      moveHandle () {
        let that = this
        this.$vDialog.modal(moveDialog, {
          title: '转移客户',
          width: 600,
          height: 420,
          params: {
            customerIds: this.multipleSelection,
          },
          callback (data) {
            if (data.type === 'save') {
              that.getCustomerList()
            }
          },
        })
      },
      returnHighSeaHandle () {
        let that = this
        this.$vDialog.modal(returnPoll, {
          title: '退回公海池',
          width: 600,
          height: 220,
          params: {
            customerIds: this.multipleSelection,
          },
          callback (data) {
            if (data.type === 'save') {
              that.getCustomerList()
            }
          },
        })
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.customerType, // 前端
          organizationId: this.organizationId, // 后端
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
      this.getCustomerList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
