<template>
  <div class="com-container"
       v-loading="dataLoading"
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
            prop="managerNo"
            label="管家号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link" :to="{name: 'serviceHousekeeperDetail', query: {id: scope.row.id}}" target="_blank">{{
                scope.row.managerNo }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="name"
            label="服务管家"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="管家类型"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span  v-for="(item, index) in scope.row.serviceManagerTypeModels" :key="index">
                <span v-if="index > 0">、</span>{{item.managerType}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="mobilePhone"
            label="联系电话"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="category"
            label="管家类别"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="item in managerCategory" :key="item.value" v-if="item.value === scope.row.category">
                {{item.name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceName"
            label="服务商主体"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="服务地区"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.serviceManagerAreaModels" :key="index">
                <span v-if="index > 0">、</span>{{item.provinceName + item.cityName + item.areaName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="可服务商品"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.serviceManagerGoodsModels" :key="index">
                <span v-if="index > 0">、</span>{{item.goodsName}}
              </span>
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
  import API2 from '../../../../utils/api2'
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
        dataLoading: false,
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
        'managerCategory',
      ]),
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
        API2.serviceManager.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
      advancedSearchHandle () { // 高级搜索
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 360,
          params: {
            preAdvancedSearch: this.advancedSearch,
            // searchKeyObject: {
            //   keyword: [],
            //   timeInterval: [],
            //   numberInterval: [],
            // area: []
            // }
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
      this.getList();
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
