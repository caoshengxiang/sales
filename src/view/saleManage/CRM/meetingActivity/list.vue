<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
        <com-button buttonType="grey" @click="operateOptions('edit')"
                    :disabled="multipleSelection.length !== 1"><i class="el-icon-edit"
                                                                  style="transform: rotate(90deg)"></i> 编辑
        </com-button>
        <com-button buttonType="backHighSeas" icon="el-icon-info" @click="operateOptions('end')"
                    :disabled="multipleSelection.length <= 0">结束
        </com-button>
        <com-button buttonType="theme" icon="el-icon-delete" @click="operateOptions('delete')"
                    :disabled="multipleSelection.length <= 0">删除
        </com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0">
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
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
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="contacterName"
          label="活动名称"
          width="200"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.contacterName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="活动状态"
          prop="customerName"
          width="180">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="phone"
          label="负责部门"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="department"
          label="负责人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="position"
          label="活动时间"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="birthday"
          label="活动经费"
          width="140"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="sex"
          label="活动人数"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="bakPhone"
          label="意向客户数"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="wx"
          label="主办单位"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm') }}
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
    <!---->
    <!---->
    <!--新增弹窗-->
    <!--<add-dialog :addDialogOpen="addDialogOpen" @hasAddDialogOpen="addDialogOpen = false"></add-dialog>-->
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../../utils/api'
  import addDialog from './addDialog'
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
      }
    },
    computed: {
      ...mapState('constData', [
        'contactsTypeOptions',
        'contactsStatus',
        'pagesOptions',
        'themeIndex',
      ]),
    },
    components: {
      comButton,
      addDialog,
    },
    methods: {
      ...mapActions('contacts', [
        'ac_contactsList',
      ]),
      addHandle () {
        this.$vDialog.modal(addDialog, {
          title: '新增活动',
          width: 900,
          height: 460,
          params: {},
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      moveHandle () {
        alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
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
      handleRouter (name, id) {
        this.$router.push({
          name: 'contactsDetail',
          query: {view: name, contactsId: id},
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
        })
      },
      getList () {
        this.dataLoading = true
        this.getQueryParams()
        API.contacts.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          this.ac_contactsList(data.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        }, (err) => {
          console.error(err)
        })
      },
      searchHandle () {
        this.getList()
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 340,
          params: {
            contactsStatus: this.contactsStatus,
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
      getQueryParams () { // 请求参数
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
    },
    beforeCreate () {
    },
    created () {
      this.getList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
