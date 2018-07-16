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
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">组织名称</div>
          <el-menu
            :default-active="organizationIndex"
            @select="selectRole">
            <el-menu-item
              v-for="item in allorganization"
              :key="item.id"
              :index="item.id.toString()">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div class="role-head-con">
            描述：<span style="padding-right: 10px;">{{roleDetail.name}}</span>
          </div>
          <div class="com-box com-box-padding com-list-box">
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
                label="是否设为签约主体"
              >
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.beContractSubject" :label="0">否</el-radio>
                  <el-radio v-model="scope.row.beContractSubject" :label="1">是</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="主体是否可销售"
              >
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.saleable" :label="0">否</el-radio>
                  <el-radio v-model="scope.row.saleable" :label="1">是</el-radio>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="com-pages-box">
            <el-pagination
              background
              :total="totles"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :layout="pagesOptions.layout"
              :page-sizes="pagesOptions.pageSizes"
              :page-size="pagesOptions.pageSize">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import add from './add'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'roleList',
    data () {
      return {
        totles:0,
        loading: false,
        roleList: [],
        roleDefaultIndex: '1',
        roleDetail: [],
        initBusinessSystemsIndex: '',
        businessSystemList: [],
        searchForm: {},
        allorganization: [],
        organizationIndex: '1',
        goodsConfs: [],
        currentPage: 1, // 当前页
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
      // that.$options.methods.getRoleList.bind(that)();
      that.$options.methods.getOrganizationList.bind(that)()
    },
    methods: {
      getOrganizationList () {
        var that = this
        let params = {
          page: 1,
          pageSize: 999,
          pid: 1,
          type: 1,
        }
        API.organization.queryAllList(params, (res) => {
          that.allorganization = res.data
          if (that.allorganization.length > 0) {
            that.organizationIndex = that.allorganization[0].id.toString()
            that.$options.methods.getRoleDetail.bind(that)(that.organizationIndex)
          }
        }, (mock) => {
          this.alldepartments = mock.data
          this.dataLoading = false
        })
      },
      getOrgDetail (id) {
        var that = this
        that.roleDefaultIndex = id.toString()
        that.loading = true
        API.role.getDetail({id: id}, function (res) {
          that.loading = false
          if (res.status) {
            that.roleDetail = res.data
            if (res.data.businessSystems && res.data.businessSystems.length > 0) {
              that.businessSystemList = res.data.businessSystems
              that.initBusinessSystemsIndex = res.data.businessSystems[0].id
            }
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, function () {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error',
          })
        })
      },
      getRoleList () {
        var that = this
        this.loading = true
        API.role.queryList(that.searchForm, (res) => {
          that.loading = false
          if (res.status) {
            that.roleList = res.data.content
            alert(that.roleList.length)
            if (that.roleList.length > 0) {
              that.roleDefaultIndex = that.roleList[0].id.toString()
              that.$options.methods.getRoleDetail.bind(that)(that.roleDefaultIndex)
            }
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      add () {
        var that = this
        this.$vDialog.modal(add, {
          title: '新增角色',
          width: 700,
          height: 400,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.$options.methods.getRoleList.bind(that)()
          },
        })
      },
      handleSizeChange (val) {
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getRoleDetail(this.roleDefaultIndex)
      },
      selectRole (index) {
        var that = this
        this.currentPage = 1
        that.$options.methods.getRoleDetail.bind(that)(index)
      },
      getRoleDetail (id) {
        var that = this
        that.roleDefaultIndex = id.toString()
        that.loading = true
        let params = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          organizationId: id,
        }
        API.baseSetting.getOrganizationGoodsConf(params, function (res) {
          that.loading = false
          if (res.status) {
            that.roleDetail = res.data.content
            that.totles = res.data.totalElements
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, function () {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error',
          })
        })
      },
      splitName (arrayName) {
        if (arrayName && arrayName.length > 0) {
          return Array.from(arrayName, (x) => x.name).join('、')
        }
        return '无'
      },
      update () {
        var that = this
        this.$vDialog.modal(add, {
          title: '修改角色',
          width: 700,
          height: 400,
          params: {
            id: that.roleDefaultIndex,
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
          },
          callback: function (data) {
            that.$options.methods.getRoleList.bind(that)()
          },
        })
      },
      deleteRole () {
        var that = this
        this.$confirm('确认是否删除?', '提示', {
          type: 'warning',
        }).then(() => {
          that.loading = true
          API.baseSetting.saveOrganizationGoodsConf({id: that.roleDefaultIndex}, function (res) {
            that.loading = false
            if (res.status) {
              Message({
                message: '删除角色成功！',
                type: 'success',
              })
              that.$options.methods.getRoleList.bind(that)()
            } else {
              Message({
                message: res.error.message,
                type: 'error',
              })
            }
          }, function () {
            that.loading = false
            Message({
              message: '系统繁忙，请稍后再试1！',
              type: 'error',
            })
          })
        }).catch(() => {})
      },
      save () {
        var that = this
        that.loading = true
        for (let i = 0; i < that.roleDetail.length; i++) {
          var obj = {}
          obj.id = that.roleDetail[i].id
          obj.beContractSubject = that.roleDetail[i].beContractSubject
          obj.saleable = that.roleDetail[i].saleable
          obj.organizationId = this.roleDefaultIndex
          that.goodsConfs.push(obj)
        }
        API.baseSetting.saveOrganizationGoodsConf({goodsConfs: this.goodsConfs}, function (resData) {
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
