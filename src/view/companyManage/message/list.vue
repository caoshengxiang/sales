<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>消息通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="orange" icon="el-icon-plus" @click="deleteHandle">删除</com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">发送消息</com-button>
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
        >
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.read}">{{ scope.row.msgType==1?"系统消息":"平台消息" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="消息标题"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail')" :class="{'read-message': scope.row.read}">{{
              scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="发送时间"
          width="200">
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.read}">{{ scope.row.sendTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="total "
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
  import add from './add'
  import API from '../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        // options: [
        //   {
        //     value: 1,
        //     label: '全部客户',
        //   }, {
        //     value: 2,
        //     label: '我负责的客户',
        //   }, {
        //     value: 3,
        //     label: '我跟进的客户',
        //   }, {
        //     value: 4,
        //     label: '我参与的客户',
        //   }],
        // value: 3,
        tableData: [],
        ipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null
        },
        total:0
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
      that.$options.methods.init.bind(that)()
    },
    methods: {
      init () {
        var that = this
        this.loading = true
        this.getQueryParams()
        this.dataLoading = true
        API.message.messageList(Object.assign({}, this.defaultListParams, null, null),
          da => {
            this.tableData = da.data.content
            this.total = da.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          }, () => {
          })
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      addHandle () {
        var that = this
        this.$vDialog.modal(add, {
          title: '发送消息通知',
          width: 700,
          height: 400,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            // that.$options.methods.getRoleList.bind(that)();
          },
        })
      },
      deleteHandle () {
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
        this.$router.push({name: 'messageDetail', params: {end: 'ME'}, query: {view: name}})
      },
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
