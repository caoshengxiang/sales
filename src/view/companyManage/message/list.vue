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
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box"
        v-loading="dataLoading"
        element-loading-text="数据加载中...">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        :max-height='posheight'
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
          align="center"
          label="消息类型"
          width="200"
        >
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.read}">{{ scope.row.msgType==1?'系统消息':'平台消息' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="消息标题"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail',scope.row.id)" :class="{'read-message': scope.row.read}">{{
              scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sendTime"
          sortable="custom"
          label="发送时间"
          width="200">
          <template slot-scope="scope">
            <span :class="{'read-message': scope.row.readStatus}">{{scope.row.sendTime && $moment(scope.row.sendTime).format('YYYY-MM-DD HH:mm:ss')}} </span>
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
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        sortObj: null, // 排序
        tableData: [],
        ipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        total: 0,
        multipleSelection: [],
        advancedSearch: {}, // 高级搜索
      }
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
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
      advancedSearch,
    },
    created () {
      var that = this
      that.$options.methods.init.bind(that)()
      this.posTableHeight();            //根据屏幕高度设置table高度
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
    methods: {
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.init()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
            demandSource: this.demandSource,
            type: 0,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              this.advancedSearch = data.params
              this.init()
            }
          },
        })
      },
      init () {
        // var that = this
        this.getQueryParams()
        this.dataLoading = true
        API.message.messageList(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          da => {
            this.tableData = da.data.content
            this.total = da.data.totalElements
            this.dataLoading = false
          }, (data) => {
						this.dataLoading = false
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
          height: 500,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.$options.methods.init.bind(that)()
          },
        })
      },
      deleteHandle () {
        this.$confirm('确定删除当前选中消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
          let param = {
            ids: id,
          }
          API.message.msgDelete(param, (res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$options.methods.init.bind(this)()
          }, (mock) => {
            if (mock.status) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }
            this.dataLoading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
				this.init()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
				this.currentPage = val
				this.init()
      },
      handleRouter (name, id) {
        API.message.msgRead({ids: id}, (da) => { // 先标记为已读
          if (da.data > 0) {
            this.$router.push({name: 'messageDetail', params: {end: 'ME'}, query: {view: name, id: id}})
          }
        })
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
