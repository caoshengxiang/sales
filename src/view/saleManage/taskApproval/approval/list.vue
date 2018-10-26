<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
      </div>
      <div class="com-bar-right">
        <el-select v-model="value" placeholder="请选择" @change="selectedOptionsHandleChange" class="com-el-select"
                   style="width:180px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          fixed
          align="center"
          prop="id"
          label="审批单号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="approvalType"
          label="审批类型"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.approvalType === 1">申请咨询师协同</span>
            <span v-if="scope.row.approvalType === 2">申请移除咨询师</span>
            <span v-if="scope.row.approvalType === 3">app订单退</span>
            <span v-if="scope.row.approvalType === 4">服务工单退单</span>
            <span v-if="scope.row.approvalType === 5">服务工单派单</span>
            <span v-if="scope.row.approvalType === 6">管家信息修改</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="publisherName"
          label="发布人员"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishTime"
          label="发布时间"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="任务状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!--principalId 负责人id-->
            <a v-if="scope.row.state === 1 && userInfo.id === scope.row.principalId" class="button" @click="handleRouter('detail', scope.row.id)">办理</a>
            <a v-if="scope.row.state === 1 && userInfo.id !== scope.row.principalId" class="button" @click="handleRouter('detail', scope.row.id)">查看</a>
            <a v-if="scope.row.state === 2" class="link" @click="handleRouter('detail', scope.row.id)">已通过</a>
            <a v-if="scope.row.state === 3" class="link" @click="handleRouter('detail', scope.row.id)">已拒绝</a>
          </template>
        </el-table-column>
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
  import { mapState } from 'vuex'
  import API from '../../../../utils/api'
  import utils from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  import moment from 'moment'
  // import webStorage from 'webStorage'

  export default {
    name: 'list',
    data () {
      return {
        total: 0,
        options: [
          {
            value: 1,
            label: '全部任务',
          }, {
            value: 2,
            label: '我待办的工作任务',
          }, {
            value: 3,
            label: '我发布的工作任务',
          }],
        value: 1,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        publisherId: '',
        auditorId: '',
        state: 1,
        changeValue: 1,
        userInfo: '',
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
    created () {
      var that = this
      // alert(1)
      that.userInfo = utils.loginExamine(that)
      // alert(that.userInfo.id)
      that.$options.methods.getTaskList.bind(that)()
    },
    methods: {
      selectedOptionsHandleChange (value) {
        this.changeValue = value
        this.getTaskList()
      },
      dateFormat: function (row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      fmtBoolColumn (row, column, cellValue) {
        if (cellValue === 1) {
          return '销售机会'
        } else {
          return '未知'
        }
      },
      getTaskList () {
        var that = this
        let param = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          sort: 'publish_time,desc'
        }

        if (that.changeValue === 2) {
          param.principalId = that.userInfo.id
          param.state = that.state
        } else if (that.changeValue === 3) {
          param.publisherId = that.userInfo.id
        }
        this.loading = true
        API.task.queryList(param, (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data.content
            that.total = res.data.totalElements
          }
        })
      },
      addHandle () {
        // alert('add btn')
      },
      moveHandle () {
        // alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getTaskList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getTaskList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: name, id: id}})
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  .com-container .com-bar[data-v-c15852fa]:after {
    content: '';
    display: block;
    height: 6px;
    width: calc(100% + 40px);
    margin-left: -16px;
    background-color: #F0F3F6;
    margin-top: 26px;
  }
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
