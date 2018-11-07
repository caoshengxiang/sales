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
        <span>统计时间</span>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="timeIntervalHandle"
          :unlink-panels="true"
          :default-value="lastMonthDate()"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button @click="searchHandle">查询</el-button>
      </div>
      <div class="com-bar-right">
        <el-button>打印</el-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出</com-button>
      </div>
      <div>
        <el-table
          ref="multipleTable2"
          border
          :data="totalData"
          tooltip-effect="dark"
        >
          <el-table-column
            align="center"
            prop="name"
            label="名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="total"
            label="分配回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="retSuccess"
            label="成功回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="retRefuse"
            label="拒绝回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="retAgain"
            label="待再回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="retWait"
            label="未回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="total"
            label="分配抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="success"
            label="已抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="retAgain"
            label="待抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
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
          tooltip-effect="dark"
          @sort-change="sortChangeHandle"
        >
          <el-table-column
            align="center"
            sortable="custom"
            prop="name"
            label="客服"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="total"
            label="分配回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="retSuccess"
            label="成功回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="retRefuse"
            label="拒绝回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="retAgain"
            label="待再回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="retWait"
            label="未回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="total"
            label="分配抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="success"
            label="已抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="retAgain"
            label="待抽查客户量"
            show-overflow-tooltip
          >
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
  import { underscoreName, lastMonthDate } from '../../../../utils/utils'
  import API from '../../../../utils/api'
  import comButton from '../../../../components/button/comButton'
  import { serverUrl } from '../../../../utils/const'
  import webStorage from 'webStorage'
  import QS from 'qs'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          timeStart: null,
          timeEnd: null,
        },
        sortObj: {}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
        totalData: [],
        time: '',
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
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        this.defaultListParams.timeStart = value[0] || ''
        this.defaultListParams.timeEnd = value[1] || ''
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getData()
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getData()
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          timeStart: this.defaultListParams.timeStart,
          timeEnd: this.defaultListParams.timeEnd,
        }
      },
      getData () {
        this.getQueryParams()
        API.statistical.serviceTask(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (da) => {
            this.tableData = da.data.content
            this.tableDataTotal = da.data.totalElements
            this.totalData = [{
              retAgain: da.other.retAgainAll,
              retRefuse: da.other.retRefuseAll,
              retSuccess: da.other.retSuccessAll,
              retTotal: da.other.retTotalAll,
              retWait: da.other.retWaitAll,
              success: da.other.successAll,
              total: da.other.totalAll,
              wait: da.other.waitAll,
              name: '合计数量',
            }]
          })
      },
      searchHandle () {
        this.getData()
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
        link.setAttribute('href', serverUrl + '/countSystem/serviceTaskExport?' + query)
        link.setAttribute('download', '客服任务统计')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
    },
    created () {
      this.getData()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
