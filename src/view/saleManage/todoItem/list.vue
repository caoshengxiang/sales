<template>
  <div class="com-container">
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
      </div>
      <div class="com-bar-right">
        <!--<el-select v-model="value" placeholder="请选择" @change="selectedOptionsHandleChange" class="com-el-select"-->
        <!--style="width:180px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<com-button buttonType="search">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="title"
          label="代办事项"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter(scope.row)">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deadline"
          label="截止时间"
          :formatter="dateFormat"
          width="240"
        >
        </el-table-column>
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="address"-->
        <!--label="任务状态"-->
        <!--show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<a v-if="scope.row.state === 1" class="link" @click="handleRouter('detail', scope.row.id)">办理</a>-->
        <!--<a v-if="scope.row.state === 2" class="link" @click="handleRouter('detail', scope.row.id)">已通过</a>-->
        <!--<a v-if="scope.row.state === 3" class="button" @click="handleRouter('detail', scope.row.id)">已拒绝</a>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="total"
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
  import { mapState, mapActions } from 'vuex'
  import API from '../../../utils/api'
  // import utils from '../../../utils/utils'
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'list',
    data () {
      return {
        loading: false,
        total: 0,
        tableData: [],
        currentPage: 1,
        defaultListParams: { // 默认列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: null, // 排序
        advancedSearch: null, // 高级搜索
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'themeIndex',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
      ...mapActions('todoItem', [
        'ac_todoItemTotal',
      ]),
      dateFormat: function (row, column) {
        var date = row[column.property]
        if (!date) {
          return ''
        }
        return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      getList () {
        this.getQueryParams()
        this.loading = true
        API.todoItem.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (res) => {
          this.loading = false
          if (res.status) {
            this.tableData = res.data.content
            this.total = res.data.totalElements
          }
        })
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.getList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getList()
      },
      handleRouter (row) {
        let END = this.themeIndex === 2 ? 'ME' : 'FE'
        switch (row.type) {
          case 1: // 个人资料完善，跳转到：个人资料编辑页面
            this.$router.push({name: 'personal', query: {view: 'base'}, params: {end: END}})
            break
          case 2: // 咨询师派单审批，跳转到：任务审批页面-我待办的任务审批
            this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: 'detail', id: row.targetId}})
            break
          case 3: // 咨询师更换审批，跳转到：任务审批页面-我待办的任务审批
            this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: 'detail', id: row.targetId}})
            break
          default:
        }
      },
    },
    created () {
      this.getList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .link {
    color: #00A7FE;
    text-decoration: underline;
    cursor: pointer;
  }

  .button {
    padding: 5px 10px;
    color: #fff;
    border-radius: 3px;
    background-color: #4BCF99;
    cursor: pointer;
  }
</style>
