<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户公海</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="orange" icon="el-icon-plus" @click="operateOptions('assign')"
                    :disabled="multipleSelection.length <= 0">分配
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-plus" @click="operateOptions('gain')"
                    :disabled="multipleSelection.length <= 0">捞取
        </com-button>
        <com-button buttonType="theme" icon="el-icon-plus" @click="operateOptions('group')"
                    :disabled="multipleSelection.length <= 0">改变分组
        </com-button>
      </div>
      <div class="com-bar-float-right">
        <com-button buttonType="import">导入</com-button>
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
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          label="客户名称"
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="source"
          label="客户来源"
          width="160">
          <template slot-scope="scope">
            <span v-for="item in customerSourceType"
                  :key="item.type"
                  v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="seaName"
          label="所属公海"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="客户级别"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="modified"
          label="最新动态日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{$moment(scope.row.modified).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="followerName"
          label="最近跟进人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="creatorName"
          label="创建人"
          show-overflow-tooltip>
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
  import comButton from '../../../components/button/comButton'
  import { mapState } from 'vuex'
  import addDialog from '../customers/addDialog'
  import assignDialog from './assignDialog'
  import groupDialog from './groupDialog'
  import API from '../../../utils/api'
  import { arrToStr } from '../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        total: 0,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'customerAddSource',
        'customerSourceType',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
      operateOptions (op) {
        let that = this
        switch (op) {
          case 'add':
            this.$vDialog.modal(addDialog, {
              title: '添加客户',
              width: 900,
              height: 410,
              params: {
                customerAddSource: this.customerAddSource,
                pageSource: 2, // 1:客户管理模块 2:客户公海模块
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getCustomersSeaList(that.currentPage - 1, that.pagesOptions.pageSize)
                }
              },
            })
            break
          case 'assign':
            this.$vDialog.modal(assignDialog, {
              title: '分配客户',
              width: 500,
              height: 230,
              params: {
                customerIds: arrToStr(this.multipleSelection, 'id'),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getCustomersSeaList(that.currentPage - 1, that.pagesOptions.pageSize)
                }
              },
            })
            break
          case 'gain':
            this.$confirm('确定捞取, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API.customerSea.fish({customerIds: arrToStr(this.multipleSelection, 'id')}, (data) => {
                if (data.status) {
                  if (data.data.fail > 0) {
                    this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                  }
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消捞取',
              })
            })
            break
          case 'group':
            this.$vDialog.modal(groupDialog, {
              title: '改变分组',
              width: 500,
              height: 240,
              params: {
                customerIds: arrToStr(this.multipleSelection, 'id'),
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getCustomersSeaList(that.currentPage - 1, that.pagesOptions.pageSize)
                }
              },
            })
            break
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.getCustomersSeaList(this.currentPage - 1, this.pagesOptions.pageSize)
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getCustomersSeaList(this.currentPage - 1, this.pagesOptions.pageSize)
      },
      handleRouter (name, id) {
        this.$router.push({name: 'customersDetail', query: {view: name, customerId: id}, params: {end: 'FE'}})
      },
      getCustomersSeaList (page, pageSize) {
        this.dataLoading = true
        API.customer.list({page: page, pageSize: pageSize}, (data) => {
          if (data.status) {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
    },
    created () {
      this.getCustomersSeaList(this.currentPage - 1, this.pagesOptions.pageSize)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
