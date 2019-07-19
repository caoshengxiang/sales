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
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="orange" @click="operateOptions('assign')"
                    :disabled="multipleSelection.length !== 1"><i class="el-icon-sort"
                                                                  style="transform: rotate(90deg)"></i> 分配
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-upload2" @click="operateOptions('gain')"
                    :disabled="multipleSelection.length <= 0">捞取
        </com-button>
        <com-button buttonType="theme" icon="el-icon-refresh" @click="operateOptions('group')"
                    :disabled="multipleSelection.length <= 0">改变分组
        </com-button>
        <com-button buttonType="transfer" icon="el-icon-refresh" @click="crossCompanyTransfer"
                    :disabled="multipleSelection.length <= 0 || multipleSelection.length > 1">跨公司转移
        </com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <!--<el-select v-model="salesOpportunitiesOptionsType" placeholder="请选择" class="com-el-select">-->
          <!--<el-option-->
            <!--v-for="item in salesOpportunitiesOptions"-->
            <!--:key="item.type"-->
            <!--:label="item.value"-->
            <!--:value="item.type">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导入模板下载</com-button>
        <com-button buttonType="import" style="position: relative;overflow: hidden;">
          <input @change="fileUploadHandle" type="file"
                 style="position: absolute;top: 0;left: 0; right: 0;bottom: 0;opacity: 0;">
          导入
        </com-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport1">导出</com-button>
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
        :data="salesOpportunitiesList"
        :max-height='posheight'
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
          prop="intentProductName"
          label="意向商品"
          width="160"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName ||
              '无名'}}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="customerId"
          label="客户ID"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="returnTimes"
          label="退回次数"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="followDate"
          label="最近跟进时间"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="latestFollowRecord"
          label="最近跟进记录"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="latestFollowerName"
          label="最近跟进人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="returnDate"
          label="退回日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.returnDate && $moment(scope.row.returnDate).format('YYYY-MM-DD HH:mm')}}
          </template>
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
          prop="customerName"
          label="客户名称"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contacter"
          label="联系人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contactPhone"
          label="联系电话"
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
            <span v-for="item in salesStateNew" :key="item.type" v-if="item.type === scope.row.stage">{{item.value}}</span>
            <!--<span v-if="scope.row.stage === -1">输单</span>-->
          </template>
        </el-table-column>
<!--        <el-table-column
          align="center"
          sortable="custom"
          prop="stage"
          label="赢率"
          width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in salesState" :key="item.type"
                  v-if="item.type === scope.row.stage">{{item.percent}}</span>
          </template>
        </el-table-column> -->
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
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="provinceName"
          label="地区"
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
          prop="industry"
          label="行业"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="billDate"
          label="预计签单时间"
          width="160">
          <template slot-scope="scope">
            {{scope.row.billDate && $moment(scope.row.billDate).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="intentBillAmount"
          label="预计签单金额"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="subordinateCompanyName"
          label="所属公司"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="customerSourcesName"
          label="客户来源"
          width="160">
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="customerStatusName"
          label="客户有效性"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="customerInvalidCauseName"
          label="客户无效原因"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="chatRecord"
          label="需求无意向原因"
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
  import chanceSeaAddDialog from './chanceSeaAddDialog'
  import moveDialog from './moveDialog'
  import { arrToStr, underscoreName } from '../../../../utils/utils'
  import { serverUrl } from '../../../../utils/const'
  import advancedSearch from './advancedSearch'
  import assignDialog from './assignDialog'
  import groupDialog from './groupDialog'
  import companyTransfer from './companyTransfer'
  import QS from 'qs'
  import webStorage from 'webStorage'

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
        'salesStateNew',
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
      chanceSeaAddDialog,
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
      operateOptions (op) {
        let that = this
        switch (op) {
          case 'add':
            this.$vDialog.modal(chanceSeaAddDialog, {
              title: '新增销售机会',
              width: 900,
              height: 500,
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
          case 'assign':
            this.$vDialog.modal(assignDialog, {
              title: '分配',
              width: 500,
              height: 230,
              params: {
                chanceIds: arrToStr(this.multipleSelection, 'id'),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunititeisList()
                }
              },
            })
            break
          case 'gain':
            this.$confirm('确定捞取, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API.salesOpportunitiesSea.fish({chanceIds: arrToStr(this.multipleSelection, 'id')}, (data) => {
                if (data.status) {
                  if (data.data.fail > 0) {
                    this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                  }
                  this.getSalesOpportunititeisList()
                  setTimeout(() => {
                    this.dataLoading = false
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
                message: '已取消捞取',
              })
            })
            break
          case 'group':
            this.$vDialog.modal(groupDialog, {
              title: '改变分组',
              width: 500,
              height: 240,
              params: {
                chanceIds: arrToStr(this.multipleSelection, 'id'),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunititeisList()
                }
              },
            })
            break
        }
      },
      // 跨公司转移
      crossCompanyTransfer () {
        let that = this;
        this.$vDialog.modal(companyTransfer, {
          title: '跨公司转移',
          width: 500,
          height: 240,
          params: {
            chanceId: arrToStr(this.multipleSelection, 'id'),
          },
          callback (data) {
            if (data.type === 'save') {
              that.getSalesOpportunititeisList()
            }
          },
        })

      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getSalesOpportunititeisList () { // 获取列表
        this.dataLoading = true
        this.getQueryParams()
        API.salesOpportunities.seaList(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (data) => {
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
        let _url = this.$router.resolve({
          name: 'salesOpportunitiesDetailSeas',
          query: {view: name, id: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
				window.open(_url.href, '_blank')
      },
      handleRouter2 (name, id) {
        let _url = this.$router.resolve({
          name: 'customersDetail',
          query: {view: name, customerId: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
				window.open(_url.href, '_blank')
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
          height: 600,
          params: {
            salesState: this.salesStateNew,
            demandSource: this.demandSource,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getSalesOpportunititeisList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
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
      excelExport () { // 模板下载
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        link.setAttribute('href', serverUrl + '/chanceSea/template/chance/download?' + query)
        link.setAttribute('download', '跟单记录导出')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
      // 有效性判断
      excelExport1 () {
        API.salesOpportunitiesSea.checkAuthority((data) => {
          console.log(data)
          if (data.status && data.data == 1) {
            this.excelExport2()
          }
        })
      },
      excelExport2 () { // 导出
        this.getQueryParams()
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let dlp = {}
        for (let key in this.defaultListParams) { // 去除分页
          if (key !== 'page' && key !== 'pageSize') {
            dlp[key] = this.defaultListParams[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, dlp, this.sortObj, as,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        link.setAttribute('href', serverUrl + '/salerChance/salerChanceSea/export?' + query)
        link.setAttribute('download', '销售机会公海公海数据导出')
        link.setAttribute('target', '_blank')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
      fileUploadHandle (e) {
        let files = e.target.files || e.dataTransfer.files
        let formData = new FormData()
        formData.append('filename', files[0].name)
        formData.append('file', files[0])
        API.salesOpportunitiesSea.seaImport(formData, up => {
          if (up.status) {
            this.$alert(`成功：${up.data.success},\n失败：${up.data.fail},\n错误日志: ${up.data.errorMessage}`, '导入日志', {
              confirmButtonText: '确定',
              callback: action => {
                // this.$message({
                //   type: 'info',
                //   message: `action: ${ action }`,
                // })
              },
            })
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
