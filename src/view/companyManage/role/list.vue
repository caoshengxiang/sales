<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" :disabled="this.multipleSelection.length <= 0"
                    @click="deleteHandle">刪除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="addHandle">新增</com-button>
        <com-button buttonType="grey" icon="el-icon-edit" :disabled="this.multipleSelection.length !== 1"
                    @click="modifyHandle">修改
        </com-button>
        <com-button buttonType="grey" icon="el-icon-remove-outline" :disabled="this.multipleSelection.length <= 0"
                    @click="disableHandle">保存
        </com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">角色名称</div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="2">
              <span slot="title">区域经理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">销售代表</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">大区总监</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div class="role-head-con">
            描述：区域经理
          </div>
          <div class="role-view-con">
            <el-tabs value="first">
              <el-tab-pane label="销售系统" name="first">
                <el-table
                  ref="multipleTable"
                  border
                  :data="userList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    align="center"
                    label="功能模块"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    label="浏览权限"
                    prop="jobNo"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="操作权限"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="服务系统" name="second">服务系统</el-tab-pane>
              <el-tab-pane label="平台后台系统" name="second1">平台后台系统</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="userTotal"
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
  import { pagesOptions } from '../../../utils/const'
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      vaules: {
        default: '1',
      },
    },
    name: 'list',
    data () {
      return {
        dataLoading: true,
        addDialogOpen: false, // 新增弹窗
        moveDialogOpen: false, // 转移弹窗
        type: 'add', // 新增弹窗
        multipleSelection: [],
        userType: 0, // 客户选项
        currentPage: 1, // 当前页
        sels: [], // 选中的值显示
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'userourceType',
        'usertate',
      ]),
      ...mapState('user', [
        'userList',
        'userTotal',
      ]),
      pagesOptions () {
        return pagesOptions
      },
    },
    components: {
      comButton
    },
    methods: {
      selsChange (sels) {
        this.sels = sels
        alert(this.sels)
      },
      delGroup () {
        var ids = this.sels.map(item => item.id).join() // 获取所有选中行的id组成的字符串，以逗号分隔
        alert(ids)
      },
      ...mapActions('user', [
        'ac_userList',
      ]),
      getuserList (page, pageSize, type) { // 获取列表数据
        let param = {
          page: page,
          pageSize: pageSize,
          type: type,
        }
        this.dataLoading = true
        API.userList(param, (res) => {
          console.log(res)
        }, (mock) => {
          this.ac_userList(mock.data)
          this.dataLoading = false
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getuserList(this.currentPage, this.pagesOptions.pageSize, this.userType)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getuserList(this.currentPage, this.pagesOptions.pageSize, this.userType)
      },
      handleRouter (name, id) {
        // this.$router.push({name: 'userDetail', query: {view: name, userId: id}})
      },
      addHandle () {
        this.addDialogOpen = true
        this.type = 'add'
      },
      modifyHandle () {
        var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
        console.info(id) // todo 暂时处理'id' is assigned a value but never used
        this.addDialogOpen = true
        this.type = 'edit'
      },
      deleteHandle () {
        this.$confirm('确定删除当前选中所有用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
          let param = {
            ids: id,
          }
          API.userDelete(param, (res) => {
            console.log(res)
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
      disableHandle () {
        this.$confirm('确定禁用当前选中所有用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
          let param = {
            ids: id,
          }
          API.userDelete(param, (res) => {
            console.log(res)
          }, (mock) => {
            if (mock.status) {
              this.$message({
                type: 'success',
                message: '禁用成功!',
              })
            }
            this.dataLoading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用',
          })
        })
      },
      resetPassword () {
        this.$confirm('确定重置当前选中所有用户密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
          let param = {
            ids: id,
          }
          API.userResetPassword(param, (res) => {
            console.log(res)
          }, (mock) => {
            if (mock.status) {
              this.$message({
                type: 'success',
                message: '重置成功!',
              })
            }
            this.dataLoading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置',
          })
        })
      },
    },
    created () {
      this.getuserList(this.currentPage, this.pagesOptions.pageSize, this.userType)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .role-head-con{
    background-color:#E9F3F5;
    padding: 0 15px;
    line-height: 42px;
    color: #426585;
    font-size: 12px;
  }
  .role-view-con{
    padding: 0 15px;
  }
</style>
