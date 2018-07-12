<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
      </div>
      <div class="com-bar-right" style="float: right">
        <com-button buttonType="search" @click="onExport">导出</com-button>
      </div>
      <div class="com-bar-right" style="float: right">
        <el-select v-model="form.organizationIds" @change="selectedOptionsHandleChange"
                   placeholder="请选择组织">
          <el-option
            v-for="item in allorganization"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">

      <div class="role-view-con">
        <el-table
          border
          tooltip-effect="dark"
          :data="tableData">
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="userName"
            label="操作者"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="organizationName"
            label="操作人组织"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="action"
            label="行为"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="businessSystemName"
            label="对象系统"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="objectType"
            label="对象类型"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="subjectName"
            label="对象主体"
          >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            label="操作时间"
          >
            <template slot-scope="scope">{{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm:ss')}}    </template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="detail"
            label="操作内容"
          >
          </el-table-column>
        </el-table>
      </div>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import API from '../../../utils/api'
  // import utils from '../../../utils/utils'
  import comButton from '../../../components/button/comButton'
  // import moment from 'moment'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        tableData: [],
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null
        },
        allorganization:[] ,
        form: {
          organizationIds:''
        },
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
      let   params = {
          page: 1,
          pageSize: 999,
          pid: 1,
          type: 1,
          level:2
        }
      API.organization.queryAllList(params, (res) => {
        this.allorganization = res.data
      }, (mock) => {
      })
      that.$options.methods.init.bind(that)()
    },
    methods: {
      onExport(){
        window.open('http://sales.dcstar-inc.com/sales/operateLog/export'+"?organizationId=" + this.form.organizationIds,'_blank');
      },
      selectedOptionsHandleChange(){
        var that = this
        that.$options.methods.init.bind(that)()
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          organizationId: this.form.organizationIds
        }
      },
      init () {
        var that = this
        this.loading = true
        this.getQueryParams()
        this.dataLoading = true
        API.syslog.logList(Object.assign({}, this.defaultListParams, null, null),
          da => {
            this.tableData = da.data.content
            this.total = da.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          }, () => {
          })
      },
      getSiteList () {
        var that = this
        this.loading = true
        let param = {}
        API.baseSetting.getSiteList(param, (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data
          } else {
            that.$message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      save () {
        var that = this
        that.loading = true
        API.baseSetting.saveSite(that.tableData, function (resData) {
          that.loading = false
          if (resData.status) {
            that.$message({
              message: '保存成功！',
              type: 'success',
            })
            that.$options.methods.getSiteList.bind(that)()
          }
        }, function () {
          that.loading = false
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
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
