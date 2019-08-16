<!--跟单记录-->
<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <!--<com-button buttonType="export" icon="el-icon-download" :disabled="multipleSelection.length <= 0">导出</com-button>-->
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出</com-button>
      </div>
      <div class="com-bar-right">
        <el-select v-model="type" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle" class="sear">筛选</com-button>
        <!-- <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button> -->
        <com-button style="background: #F7F8F7;" class="sear" @click="showAdvanceSearch">高级搜索<i :class="advancedSearchShow ? 'el-icon-arrow-up el-icon--right' : 'el-icon-arrow-down el-icon--right'"></i></com-button>
      </div>
    </div>
    <!-- 高级搜素 -->
    <transition name="el-zoom-in-top">
      <div class="advancedSearch" v-if="advancedSearchShow">
        <div class="advancedSearch-left">
          <p style="font-size: 15px; padding-top: 10px;color: #606266; text-indent: 15px;">填写搜索条件></p>
          <advancedSearch ref="advanced" :salesState="salesStateNew" :preAdvancedSearch="advancedSearch" @subAdvanced="subAdvanced"></advancedSearch>
        </div>
      </div>
    </transition>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        sortable="custom"
        :data="tableData"
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
          prop="chanceName"
          label="来自销售需求"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.chanceId)">{{ scope.row.chanceName || '无名' }}</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          sortable="customerId"
          label="客户ID"
          prop="customerId"
          show-overflow-tooltip
          width="180">
          <!--<template slot-scope="scope">{{ scope.row.customerName }}</template>-->
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          sortable="custom"
          label="来自客户"
          prop="customerName"
          show-overflow-tooltip
          width="180">
          <!--<template slot-scope="scope">{{ scope.row.customerName }}</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="followDesc"
          show-overflow-tooltip
          label="发布内容">
          <template slot-scope="scope"><div style="width: 100%;text-align: left;">{{ scope.row.followDesc }}</div></template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="creatorName"
          label="发布人"
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
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="发布日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="chanceProviderName"
          label="需求提供人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="chanceSourceName"
          label="需求来源"
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
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../../utils/utils'
  import { serverUrl } from '../../../../utils/const'
  import QS from 'qs'
  import webStorage from 'webStorage'

  // import 'element-ui/lib/theme-chalk/base.css';
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'
  Vue.component(CollapseTransition.name, CollapseTransition)

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        advancedSearchShow: false,
        timer: false,
        dataLoading: false,
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认列表请求参数
          page: null,
          pageSize: null,
          chanceId: null,
          // type: 1, // 1：我创建的 2：我参与的
        },
        chanceId: null, // 路由参数
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        options: [
          {type: 1, value: '我创建的跟单记录'},
          {type: 2, value: '我参与的跟单记录'}
        ],
        type: 1, // 1：我创建的 2：我参与的
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 275
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
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
    created () {
      this.getRecordsList()
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'salesState',
        'salesStateNew',
      ]),
    },
    components: {
      comButton,
      advancedSearch,
    },
    methods: {
      subAdvanced (item) {
        this.currentPage = 1;
        this.advancedSearch = item
        this.getRecordsList()
      },
      showAdvanceSearch () {
        this.advancedSearchShow = !this.advancedSearchShow;
        this.posTableHeight();
      },
      addHandle () {
        // alert('add btn')
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 275;
        this.posheight = new_h;
      },
      moveHandle () {
        // alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getRecordsList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getRecordsList()
      },
      handleRouter (name, id) {
        let _url = this.$router.resolve({name: 'salesOpportunitiesDetail', query: {view: name, id: id}, params: {end: 'FE'}})
				window.open(_url.href, '_blank')
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
        this.getRecordsList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 360,
          params: {
            salesState: this.salesStateNew,
            preAdvancedSearch: this.advancedSearch
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getRecordsList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
          },
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getRecordsList()
      },
      getRecordsList () {
        this.dataLoading = true
        this.getQueryParams()
        API.orderRecords.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          // this.ac_contactsList(data.data)
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        }, (data) => {
          // this.ac_contactsList(data.data)
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getQueryParams () { // 请求参数配置
        this.chanceId = this.$route.query.chanceId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.type
        }
        if (this.chanceId) { // 更多
          this.defaultListParams.chanceId = this.chanceId
        }
      },
      excelExport () { // 导出
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
        link.setAttribute('href', serverUrl + '/followOrderRecord/export?' + query)
        link.setAttribute('download', '跟单记录导出')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
  .com-container .com-bar {
    padding: 15px 20px;
  }
  .advancedSearch {
    overflow: hidden;
    border-top: 8px solid #F0F3F6;
    border-bottom: 8px solid #F0F3F6;
    .com-dialog-container {
      padding: 15px 20px 15px 10px;
    }
    .advancedSearch-left {
      float: left;
      overflow: hidden;
    }
  }
  .com-bar {
    padding-bottom: 7px;
    .com-el-select {
      float: left;
      margin-top: -7px;
      margin-right: 10px;
    }
    .sear {
      float:left;
      margin-top: -7px;
    }
  }
</style>
