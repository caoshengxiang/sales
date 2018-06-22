<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="orange" @click="operateOptions('assign')"
                    :disabled="multipleSelection.length !== 1"><i class="el-icon-sort" style="transform: rotate(90deg)"></i> 分配
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-upload2" @click="operateOptions('gain')"
                    :disabled="multipleSelection.length <= 0">捞取
        </com-button>
        <com-button buttonType="theme" icon="el-icon-refresh" @click="operateOptions('group')"
                    :disabled="multipleSelection.length <= 0">改变分组
        </com-button>
      </div>
      <div class="com-bar-float-right">
        <div class="com-bar-right">
          <!--后端-->
          <el-select
            v-if="themeIndex === 1"
            v-model="organizationId"
            @change="searchHandle"
            placeholder="请选择组织" class="com-el-select" style="width: 200px">
            <el-option label="全部组织的公海" :value="null"></el-option>
            <el-option
              v-for="item in organizationOptions"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
&nbsp;&nbsp;&nbsp;&nbsp;
          <!--<com-button buttonType="import">导入</com-button>-->
          <vue-xlsx-table @on-select-file="handleSelectedFile">导入</vue-xlsx-table>
        </div>
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
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="name"
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
          sortable
          prop="source"
          label="客户来源"
          width="120">
          <template slot-scope="scope">
            <span v-for="item in customerSourceType"
                  :key="item.type"
                  v-if="item.type === scope.row.source">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="seaName"
          label="所属公海"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="level"
          label="客户级别"
          width="130"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="modified"
          label="最新动态日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.modified && $moment(scope.row.modified).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="followerName"
          label="最近跟进人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="creatorName"
          label="创建人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-if="themeIndex === 1"
          show-overflow-tooltip
          align="center"
          sortable
          prop="organizationName"
          label="所属组织">
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
  import addDialog from './addDialog'
  import assignDialog from './assignDialog'
  import groupDialog from './groupDialog'
  import API from '../../../utils/api'
  import { arrToStr } from '../../../utils/utils'
  import previewExcel from './previewExcel'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        total: 0,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          chanceId: null,
          organizationId: null,
        },
        chanceId: null, // 路由参数
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'customerAddSource',
        'customerSourceType',
        'themeIndex',
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
                  that.getCustomersSeaList()
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
                  that.getCustomersSeaList()
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
                  this.getCustomersSeaList()
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
                  that.getCustomersSeaList()
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
        this.getCustomersSeaList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getCustomersSeaList()
      },
      searchHandle () {
        this.getCustomersSeaList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'customersHighSeasDetail', query: {view: name, customerId: id}, params: {end: 'FE'}})
      },
      getCustomersSeaList () {
        this.dataLoading = true
        this.getQueryParams()
        API.customer.seaList(this.defaultListParams, (data) => {
          if (data.status) {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getQueryParams () { // 请求参数配置
        this.chanceId = this.$route.query.chanceId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.contactsTypeOption, // 前端
          organizationId: this.organizationId // 后端
        }
        if (this.chanceId) { // 更多
          this.defaultListParams.chanceId = this.chanceId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
      handleSelectedFile (convertedData) { // 导入
        console.log(convertedData)
        this.$vDialog.modal(previewExcel, {
          title: '预览',
          width: 1100,
          height: 660,
          params: {
            convertedData: convertedData,
          },
          callback: (data) => {
            if (data.type === 'save') {
              // this.getCustomersSeaList()
            }
          },
        })
      }
    },
    created () {
      this.getCustomersSeaList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .xlsx-button {
    background-color: #FF7700 !important;
    width: 72px !important;
    color: #fff !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
</style>
