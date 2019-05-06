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
        <el-button type="success" :disabled="multipleSelection.length !== 1" @click="auditTaskYes">审核通过</el-button>
        <el-button type="danger" :disabled="multipleSelection.length !== 1" @click="auditTaskNo">审核拒绝</el-button>
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
        :max-height='posheight'
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          prop="id"
          label="审批单号"
        >
          <template slot-scope="scope">
            <a class="link" @click="handleRouter('detail', scope.row.id)">{{scope.row.id}}</a>
          </template>
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
            <span v-if="scope.row.approvalType === 7">erp订单退单</span>
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
        <!--<el-table-column-->
          <!--align="center"-->
          <!--prop="state"-->
          <!--label="审批状态"-->
          <!--show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<span v-if="scope.row.state === 1">待审批</span>-->
            <!--<span v-else-if="scope.row.state === 2">已通过</span>-->
            <!--<span v-else>已拒绝</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          align="center"
          prop="state"
          label="审批单状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">审批中</span>
            <span v-if="scope.row.state === 2">已通过</span>
            <span v-if="scope.row.state === 3">已拒绝</span>
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
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        total: 0,
        options: [
           {
            value: 1,
            label: '我待办的审核',
          }, {
            value: 2,
            label: '我经办的审核',
          }, {
            value: 3,
            label: '我发起的审核',
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
      var that = this
      // alert(1)
      that.userInfo = utils.loginExamine(that)
      // alert(that.userInfo.id)
      that.$options.methods.getTaskList.bind(that)()
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    methods: {
      selectedOptionsHandleChange (value) {
        this.changeValue = value
        this.currentPage = 1
        this.getTaskList()
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
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
          sort: 'publish_time,desc',
          type: this.value
        }

        // if (that.changeValue === 2) {
        //   param.principalId = that.userInfo.id
        //   param.state = that.state
        // } else if (that.changeValue === 3) {
        //   param.publisherId = that.userInfo.id
        // }
        this.loading = true
        API.task.queryList(param, (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data.content
            that.total = res.data.totalElements
          }
        })
      },
      auditTaskYes () {
        this.auditTask(2)
      },
      auditTaskNo () {
        this.auditTask(3)
      },
      auditTask (state) {
        let param = {
          // state: state,
          processId: this.multipleSelection[0].id,
          approved: state === 2,
          opinion: '',
        }
        if (state === 2) {
          this.$confirm('确定审核通过, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            API.task.auditTask(param, (res) => {
              this.loading = false
              if (res.status) {
                this.getTaskList()
                this.$message.success('审核成功')
              } else {
                this.$message.success(res.error.message)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
        } else {
          this.$prompt('请输入审核意见(注意:拒绝后此工单将不能重派给该管家)', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            param.opinion = value
            API.task.auditTask(param, (res) => {
              this.loading = false
              if (res.status) {
                this.getTaskList()
                this.$message.success('审核成功')
              } else {
                this.$message.success(res.error.message)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入',
            })
          })
        }
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
        let _url = this.$router.resolve({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: name, id: id}});
				window.open(_url.href, '_blank')
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
