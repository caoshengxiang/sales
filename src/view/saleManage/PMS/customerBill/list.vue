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
        <com-button buttonType="add" icon="el-icon-circle-check-outline" @click="operateOptions('pass')"
                    :disabled="multipleSelection.length !== 1||(multipleSelection[0]&&multipleSelection[0].auditState!==1)">审核通过
        </com-button>
        <com-button buttonType="delete" icon="el-icon-remove-outline" @click="operateOptions('refuse')"
                    :disabled="multipleSelection.length !== 1||(multipleSelection[0]&&multipleSelection[0].auditState!==1)">审核拒绝
        </com-button>
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
            prop="bizNum"
            label="业务编号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link" :to="{name: 'customerBillDetail', query: {id: scope.row.id}}">{{
                scope.row.bizNum }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="auditState"
            label="审核状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.auditState === 1">待审核</span>
              <span v-if="scope.row.auditState === 2">已拒绝</span>
              <span v-if="scope.row.auditState === 3">已通过</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="customerName"
            label="客户"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="uploadUserName"
            label="上传人"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.uploadUserName}}[{{scope.row.uploadUserPhone}}]
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="accountPeriodYear"
            label="账期"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.accountPeriodYear}}年{{scope.row.accountPeriodMonth}}月
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="bizAmount"
            label="业务金额"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="业务类型"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.bizType === 1">收入</span>
              <span v-if="scope.row.bizType === 2">支出</span>
              <span v-if="scope.row.bizType === 3">其他</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="billNum"
            label="票据数量"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop=""
            label="服务管家"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.serviceManagerList" :key="index">
                <span v-if="index > 0">、</span>{{item.name}}
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
  import { underscoreName, arrToStr } from '../../../../utils/utils'
  import API2 from '../../../../utils/api2'
  import comButton from '../../../../components/button/comButton'
  import advancedSearch from './advancedSearch'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        currentPage: 1,
        tableDataTotal: 0,
        tableData: [],
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        multipleSelection: [],
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
        // this.getCustomerList()
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
        API2.customerBill.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
      operateOptions (type) {
        switch (type) {
          case 'pass':
            this.$confirm('确定通过审核, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API2.customerBill.audit({
                id: arrToStr(this.multipleSelection, 'id'),
                auditState: 3,
              }, (data) => {
                if (data.status) {
                    this.$message.success(`操作成功`)
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getList()
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
                message: '已取消删除',
              })
            })
            break
          case 'refuse':
            this.$prompt('请输入审核意见', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({value}) => {
              this.dataLoading = true
              API2.customerBill.audit({
                id: arrToStr(this.multipleSelection, 'id'),
                auditState: 2,
                auditRemark: value,
              }, (data) => {
                if (data.status) {
                  this.$message.success(`操作成功`)
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getList()
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
                message: '已取消删除',
              })
            })
            break
          default:
        }
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
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
