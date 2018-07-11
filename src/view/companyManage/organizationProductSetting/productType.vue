<template>
  <div class="com-container"
       v-loading="loading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>组织商品配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="grey" icon="el-icon-remove-outline" @click="save">保存
        </com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">

      <div class="role-view-con">
        <el-table
          border
          tooltip-effect="dark"
          :data="roleDetail"
        >
          <el-table-column
            align="center"
            label="商品"
            show-overflow-tooltip
            prop="goodsName"
            width="200"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="类型"
          >
            <template slot-scope="scope">
              <el-radio v-model="scope.row.productType" :label="1">A类产品（记账/托管）</el-radio>
              <el-radio v-model="scope.row.productType" :label="2">A类产品（税务顾问/财税金融咨询）</el-radio>
              <el-radio v-model="scope.row.productType" :label="3">B类产品</el-radio>
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
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  // import add from './add'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'

  export default {
    name: 'roleList',
    data () {
      return {
        loading: false,
        currentPage: 1, // 当前页
        roleList: [],
        roleDefaultIndex: '1',
        roleDetail: [],
        initBusinessSystemsIndex: '',
        businessSystemList: [],
        searchForm: {},
        allorganization: [],
        organizationIndex: '1',
        goodsConfs: [],
        totle: 0,
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'pagesOptions',
      ]),
      ...mapState('user', [
        'userList',
        'userTotal',
      ]),
    },
    components: {
      comButton,
    },
    created () {
      var that = this
      that.$options.methods.getOrganizationList.bind(that)()
    },
    methods: {
      getOrganizationList () {
        var that = this
        let params = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
        API.baseSetting.getProductType(params, (res) => {
          that.roleDetail = res.data.content
          that.totle = res.data.totalElements
        }, (mock) => {
          this.alldepartments = mock.data
          this.dataLoading = false
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getOrganizationList()
      },

      save () {
        var that = this
        that.loading = true
        API.baseSetting.updateProductType({goodsTypes: that.roleDetail}, function (resData) {
          that.loading = false
          if (resData.status) {
            Message({
              message: '保存成功！',
              type: 'success',
            })
          }
        }, function () {
          that.loading = false
          Message({
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

  .role-head-con {
    background-color: #E9F3F5;
    padding: 0 15px;
    line-height: 42px;
    color: #426585;
    font-size: 12px;
  }

  .role-view-con {
    padding: 0 15px;
  }

  .el-menu-item {
    $select_bg: #F4F6F8;
    &:hover {
      background-color: #fbfbfb;
    }
    &:focus {
      background-color: $select_bg;
    }
    &.is-active {
      font-weight: 600;
      color: #426585;
      background-color: $select_bg;
    }
  }
</style>
