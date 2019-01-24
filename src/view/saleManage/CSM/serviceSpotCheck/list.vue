<template>
  <div class="com-container">
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
        <com-button buttonType="add" :disabled="multipleSelection.length === 0" icon="el-icon-edit-outline" @click="assginOrderHandle">派单</com-button>
        <com-button buttonType="add" type="primary" :disabled="multipleSelection.length !== 1" icon="el-icon-question" @click="checkHandle">抽查</com-button>
      </div>
      <div class="com-bar-right">
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
            prop="num"
            label="抽查单号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link" :to="{name: 'serviceSpotCheckDetail', query: {id: scope.row.id, view: 'order'}}">{{
                scope.row.num }}
              </router-link>
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
            prop="orderId"
            label="订单号"
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
            prop="state"
            label="抽查状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1">待派单</span>
              <span v-if="scope.row.state === 2">待抽查</span>
              <span v-if="scope.row.state === 3">已抽查 </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="cusServiceName"
            label="抽查客服"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="assignTime"
            label="抽查派单时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.assignTime && $moment(scope.row.assignTime).format('YYYY-MM-DD HH:mm')}}
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
  import { underscoreName, arrToStr } from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import assginOrder from './assginOrder'
  import checkHandle from './checkHandle'
  import advancedSearch from './advancedSearch'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
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
        API.serviceSpotCheck.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
      assginOrderHandle () {
        this.$vDialog.modal(assginOrder, {
          title: '派单',
          width: 600,
          height: 210,
          params: {
            ids: arrToStr(this.multipleSelection, 'id')
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      checkHandle () {
        this.$vDialog.modal(checkHandle, {
          title: '抽查',
          width: 800,
          height: 460,
          params: {
            ids: arrToStr(this.multipleSelection, 'id')
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      advancedSearchHandle () { // 高级搜索
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 360,
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
      this.getList()
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
