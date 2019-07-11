<template>
  <div class="com-container" v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-refresh" @click="orderHandle('back')"
                    :disabled="multipleSelection.length != 1 || (multipleSelection.length === 1 && multipleSelection[0].orderState === 1)">申请退单
        </com-button>
        <com-button buttonType="add" icon="el-icon-sort" @click="orderHandle('move')"
                    :disabled="multipleSelection.length != 1">转移
        </com-button>
      </div>
      <div class="com-bar-right">
        <com-button buttonType="add" icon=""
                    v-if="managerDetail"
                    @click="orderHandle('laze')">
          <!-- {{managerDetail.workState === 1 ? '服务中' : '打烊中'}} -->
          打烊设置
        </com-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div>
        <el-table
          ref="multipleTable"
          border
          :data="tableData"
          :max-height='posheight'
          :row-style="tableRowStyle"
          tooltip-effect="dark"
          @sort-change="sortChangeHandle"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            type="selection"
            align="center"
            width="40">
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderNum"
            cell-style="col-warn"
            label="派单单号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link"
                           :to="{name: 'serviceWorkOrderDetail', query: {id: scope.row.id,orderId: scope.row.orderId, view: 'operate'}}" target="_blank">
                {{ scope.row.orderNum }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderId"
            label="订单单号"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceState"
            label="订单状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.serviceState === 1">待服务</span>
              <span v-if="scope.row.serviceState === 2">服务中</span>
              <span v-if="scope.row.serviceState === 3">已完成</span>
              <span v-if="scope.row.serviceState === 4">退单中</span>
              <span v-if="scope.row.serviceState === 5">已接单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderState"
            label="工单状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orderState === 1">待接收</span>
              <span v-if="scope.row.orderState === 2">已拒绝</span>
              <span v-if="scope.row.orderState === 3">进行中</span>
              <span v-if="scope.row.orderState === 4">已完成</span>
              <span v-if="scope.row.orderState === 5">退单中</span>
              <span v-if="scope.row.orderState === 6">已退单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="customerName"
            label="服务客户"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contactName"
            label="客户联系人"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="goodsName"
            label="服务商品"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceRecordName"
            label="当前服务进度"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span :title="scope.row.serviceRecordTime && $moment(scope.row.serviceRecordTime).format('YYYY-MM-DD HH:mm')">{{scope.row.serviceRecordName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="scheduleTime"
            label="计划完结时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.scheduleTime && $moment(scope.row.scheduleTime).format('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="specificationName"
            label="服务规格"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceType"
            label="派单类型"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.serviceTypeName}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderPayment"
            label="订单实付金额"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="managerName"
            label="服务管家"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="assignDate"
            label="服务派单时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.assignDate && $moment(scope.row.assignDate).format('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="auditTime"
            label="服务接单时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.auditTime && $moment(scope.row.auditTime).format('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="com-pages-box">
        <el-pagination
          background
          :total="tableDataTotal"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :layout="pagesOptions.layout"
          :page-sizes="pagesOptions.pageSizes"
          :page-size="pagesOptions.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName } from '../../../../utils/utils'
  import API from '../../../../utils/api'
  import comButton from '../../../../components/button/comButton'
  import returnOrder from './returnOrder'
  import selectManager from './selectManager'
  import laze from './laze'
  import webStorage from 'webStorage'
  import advancedSearch from './advancedSearch'
  import QS from 'qs'
  import { serverUrl } from '../../../../utils/const'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        dataLoading: false,
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'assign_date,desc'},
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        userInfo: {},
        managerDetail: {},

        show_page_status:false,
      }
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
      },
      show_page_status(val){ //监听页面是否刷新，状态是否改变，去清楚缓存的商品
          if(!val){
            localStorage.removeItem('TEMPRODUCESTORAGE')
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
    methods: {
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getList()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      excelExport () { // 导出
        API.serviceManager.authCheck({}, (res) => {
          if (res.status) {this.getQueryParams()
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
            link.setAttribute('href', serverUrl + '/serviceWorkOrder/export?' + query)
            link.setAttribute('download', '跟单记录导出')
            let event = document.createEvent('MouseEvents') // 初始化事件对象
            event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
              null) // 触发事件
            link.dispatchEvent(event)
          }
        })

      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getList()
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      getList () {
        this.getQueryParams()
        this.dataLoading = true
        API.workOrder.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
      orderHandle (type) {
        switch (type) {
          case 'back':
            this.$vDialog.modal(returnOrder, {
              title: '申请退单',
              width: 1100,
              height: 660,
              params: {
                workOrder: this.multipleSelection[0],
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getList()
                }
              },
            })
            break
          case 'move':
            this.$vDialog.modal(selectManager, {
              title: '转移工单',
              width: 500,
              height: 200,
              params: {
                workOrder: this.multipleSelection[0],
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getList()
                }
              },
            })
            break
          case 'laze':
            this.$vDialog.modal(laze, {
              title: '打烊设置',
              width: 600,
              height: 550,
              params: {
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getList()
                }
              },
            })
            // API.serviceManager.changeWorkState({workState: this.managerDetail.workState === 1 ? 2 : 1}, (res) => {
            //   if (res.status) {
            //     this.$message.success('操作成功')
            //     this.getManagerDetail(this.userInfo.id)
            //   }
            // })
            break
          default:
        }
      },
      getManagerDetail (id) { // 通过userid查的新接口
        API.serviceManager.detailByUserId(id, (da) => {
          this.managerDetail = da.data
        })
      },
      advancedSearchHandle () { // 高级搜索
        this.show_page_status = true;
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              // console.log('高级搜索数据：', data.params)
              this.advancedSearch =  data.params
              this.show_page_status = true;
              this.currentPage = 1; //当搜索的时候刷新跳转到当前页
              this.getList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
          },
        })
      },
      // 修改table tr行的背景色
      tableRowStyle ({ row, rowIndex }) {
        if (row.orderState === 6) {
          return ''
        } else if (row.finishTime && row.scheduleTime && row.auditTime && (row.finishTime - row.scheduleTime) > 0) {
          return 'background-color: #ff7474'
        } else if (!row.finishTime && row.scheduleTime && row.auditTime && ((new Date()).valueOf()) - row.scheduleTime > 0) {
          return 'background-color: #ff7474'
        } else if (row.overTime) {
          return 'background-color: #ffe762'
        }
        return ''
      },
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')
      this.getList()
      this.getManagerDetail(this.userInfo.id);
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
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .col-error {
    background: #bd2c00;
  }
  .col-warn {
    background: #ee9900;
  }
</style>
