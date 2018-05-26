<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>任务审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
      </div>
      <div class="com-bar-right">
        <el-select v-model="value" placeholder="请选择" class="com-el-select" style="width:180px">
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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
          align="center"
          prop="name"
          label="任务名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="principalName"
          label="负责人员"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="businessType"
          :formatter="fmtBoolColumn"
          label="关联销售类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="businessDesc"
          label="关联业务描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          label="任务截止时间"
          show-overflow-tooltip>
          >
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
          label="任务发布时间"
      >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="任务状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <a v-if="scope.row.state === 1" class="link" @click="handleRouter('detail')">办理</a>
            <a v-if="scope.row.state === 2" class="link" @click="handleRouter('detail')">已通过</a>
            <a v-if="scope.row.state === 3" class="button" @click="handleRouter('detail')">已拒绝</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="totle"
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
  import API from '../../../utils/api'
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'list',
    data () {
      return {
        totle:0,
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
        value: 3,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
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
      var that = this;
      that.$options.methods.getTaskList.bind(that)();
    },
    methods: {
      fmtBoolColumn(row,column,cellValue){
        if (cellValue === 1) {
          return '销售机会';
        }else {
          return '未知';
        }
      },
      getTaskList () {
        var that = this;
        let param = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
        this.loading = true
        API.task.queryList(param, (res) => {
          that.loading = false;
          if(res.status){
            that.tableData = res.data.content;
            that.totle = res.data.totalElements
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }

        }, (mock) => {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error'
          });
        })
      },
      addHandle () {
        alert('add btn')
      },
      moveHandle () {
        alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      handleRouter (name) {
        this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: name}})
      },
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
