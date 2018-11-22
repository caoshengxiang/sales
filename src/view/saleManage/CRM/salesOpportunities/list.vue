<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" @click="operateOptions('delete')"
                    :disabled="multipleSelection.length <= 0">删除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <!-- 销售机会模块列表中“转移”按钮与销售机会详情里面“转移”按钮隐藏
          业务模式发生变化，同一客户（含该客户的销售机会）同一时间在同一分子公司只能存在一个销售跟进人员，为了避免同一客户多个销售机会被多个用户跟进，故需要隐藏销售机会“转移”功能
          [期望]
          销售机会模块列表中“转移”按钮与销售机会详情里面“转移”按钮隐藏-->
        <com-button buttonType="orange" @click="operateOptions('move')"
        :disabled="multipleSelection.length <= 0"><i class="el-icon-sort"
        style="transform: rotate(90deg)"></i> 转移
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-back" @click="operateOptions('return')"
        :disabled="multipleSelection.length <= 0">退回机会公池
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
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :max-height='posheight'
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
          fixed
          align="center"
          sortable="custom"
          label="客户名称"
          prop="customerName"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <a v-if="scope.row.customerId" class="col-link" @click="handleRouter2('detail', scope.row.customerId)">{{ scope.row.customerName }}</a>
            <a v-else class="col-link" @click="operateOptions('bind', scope.row)">绑定客户</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          sortable="custom"
          prop="intentProductName"
          label="意向商品"
          width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName ||
              '暂无'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="contacter"
          label="联系人"
          width="160"
          show-overflow-tooltip>
          </el-table-column>
        <el-table-column
          align="center"
          prop="contactPhone"
          label="联系电话"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="followDate"
          label="最近跟单时间"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="latestFollowRecord"
          label="最近跟单记录"
          width="160"
          show-overflow-tooltip>
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
          prop="chanceSourceName"
          label="需求来源"
          width="160"
          show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
          <!--<span v-for="item in demandSource" :key="item.type"-->
          <!--v-if="item.type === scope.row.source">{{item.value}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="providerName"
          label="需求提供人"
          width="160"
          show-overflow-tooltip>
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
          prop="intentBillAmount"
          label="地区"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.provinceName }}
            {{ scope.row.cityName }}
            {{ scope.row.areaName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="industry"
          label="行业"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
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
  import comButton from '../../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../../utils/api'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'
  import { arrToStr, underscoreName } from '../../../../utils/utils'
  import advancedSearch from './advancedSearch'
  import bindCustomer from './bindCustomer'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
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
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'demandSource',
        'salesOpportunitiesOptions',
        'themeIndex',
        'topSource',
      ]),
      ...mapState('salesOpportunities', [
        'salesOpportunitiesList',
        'salesOpportunitiesTotal',
      ]),
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 260
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    created () {
      this.getSalesOpportunititeisList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    mounted() {
      // 监听页面高度
      const that = this
      window.onresize = () => {
        return (() => {
          let a = document.body.clientHeight
          that.h = a
        })()
      }
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
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      operateOptions (op, row) {
        let that = this
        let rowData = row
        switch (op) {
          case 'add':
            this.$vDialog.modal(addDialog, {
              title: '新增销售机会',
              width: 900,
              height: 600,
              params: {
                salesState: this.salesState,
                topSource: this.topSource, // 顶级客户来源
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunititeisList()
                }
              },
            })
            break
          case 'bind':
            this.$vDialog.modal(bindCustomer, {
              title: '绑定客户(可二选一操作)',
              width: 800,
              height: 380,
              params: {
                chanceDetail: JSON.parse(JSON.stringify(rowData))
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
              API.salesOpportunities.batchDelete({salerChanceIds: arrToStr(this.multipleSelection, 'id')}, (data) => {
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
          case 'return':
            this.$confirm('确定退回机会公池, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API.salesOpportunities.returnSea({chanceIds: arrToStr(this.multipleSelection, 'id')}, (data) => {
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
        if (this.themeIndex === 0) {
          API.salesOpportunities.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
            (data) => {
              this.ac_salesOpportunitiesList(data.data)
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            })
        } else if (this.themeIndex === 1) {
          API.salesOpportunities.listAdmin(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
            (data) => {
              this.ac_salesOpportunitiesList(data.data)
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            })
        }
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
        this.$router.push({
          name: 'salesOpportunitiesDetail',
          query: {view: name, id: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
      },
      handleRouter2 (name, id) {
        this.$router.push({
          name: 'customersDetail',
          query: {view: name, customerId: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
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
            preAdvancedSearch: this.advancedSearch,
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
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
