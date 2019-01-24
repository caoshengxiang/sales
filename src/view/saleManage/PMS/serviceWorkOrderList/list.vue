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
                    :disabled="multipleSelection.length != 1">申请退单
        </com-button>
        <com-button buttonType="add" icon="el-icon-sort" @click="orderHandle('move')"
                    :disabled="multipleSelection.length != 1">转移
        </com-button>
      </div>
      <div class="com-bar-right">
        <com-button buttonType="add" icon=""
                    v-if="managerDetail"
                    @click="orderHandle('laze')">
          {{managerDetail.workState === 1 ? '服务中' : '打烊中'}}
        </com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div>
        <el-table
          ref="multipleTable"
          border
          stripe
          :data="tableData"
          :max-height='posheight'
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
            label="派单单号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link"
                           :to="{name: 'serviceWorkOrderDetail', query: {id: scope.row.id,orderId: scope.row.orderId, view: 'operate'}}">
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
              <span v-if="scope.row.serviceState === 4">已退单</span>
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
            prop="specificationName"
            label="服务规格"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceTypeName"
            label="派单类型"
            width="160"
            show-overflow-tooltip
          >
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName } from '../../../../utils/utils'
  import API from '../../../../utils/api'
  import comButton from '../../../../components/button/comButton'
  import returnOrder from './returnOrder'
  import selectManager from './selectManager'
  import webStorage from 'webStorage'
  import advancedSearch from './advancedSearch'

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
            API.serviceManager.changeWorkState({workState: this.managerDetail.workState === 1 ? 2 : 1}, (res) => {
              if (res.status) {
                this.$message.success('操作成功')
                this.getManagerDetail(this.userInfo.id)
              }
            })
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
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getList()
            }
          },
        })
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
</style>
