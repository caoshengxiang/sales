<template>
  <div class="com-container" v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="orange" icon="el-icon-plus" :disabled="multipleSelection.length<=0" @click="moveHandle">
          删除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" :disabled="multipleSelection.length<=0" @click="addHandle">
          标记已读
        </com-button>
      </div>
      <div class="com-bar-right">
        <!--<el-select v-model="value" placeholder="请选择" class="com-el-select">-->
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
          label="消息类型"
          width="200"
          prop="msgType"
        >
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.readStatus}">{{ scope.row.msgType === 1 ? '系统消息': '平台通知' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="消息标题"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')" :class="{'read-message': scope.row.readStatus}">{{
              scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="发送时间"
          width="200">
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.readStatus}">{{ scope.row.sendTime && $moment(scope.row.sendTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
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
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: true,
        tableData: [],
        total: 0,
        multipleSelection: [],
        currentPage: 1,
        sortObj: null, // 排序
        advancedSearch: null, // 高级搜索
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
        this.getMessageList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.getMessageList()
      },
      handleRouter (name) {
        this.$router.push({name: 'messageDetail', params: {end: 'FE'}, query: {view: name}})
      },
      getMessageList () { // 获取列表数据
        this.getQueryParams()
        this.dataLoading = true
        API.message.personalMessage(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          da => {
            this.tableData = da.data.content
            this.total = da.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          }, () => {
            // setTimeout(() => {
            //   this.dataLoading = false
            // }, 300)
          })
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
    },
    created () {
      this.getMessageList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .col-link {
    text-decoration: underline;
  }

  .read-message {
    color: #DDDDDD !important;
  }
</style>
