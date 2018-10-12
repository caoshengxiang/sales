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
        <span>统计时间: </span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="com-bar-right">
        <el-button>打印</el-button>
        <el-button>导出</el-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-list-box">
      <div class="home-row">
        <el-row>
          <el-col :span="12">
            <div class="col-box">
              <pie-origin></pie-origin>
            </div>
          </el-col>
          <el-col :span="12" class="l-border-6">
            <div class="col-box">
              <pie-reason></pie-reason>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName } from '../../../../utils/utils'
  import pieOrigin from './pieOrigin'
  import pieReason from './pieReason'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [
          {
            test: 'test Data',
          }],
        multipleSelection: [],
        value1: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      pieOrigin,
      pieReason,
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
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
        // this.getCustomerList()
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 320px;
      }
    }
    .l-border-6 {
      border-left: 6px solid $part-color;
    }
    .r-border-6 {
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 100%;
    }
  }
</style>
