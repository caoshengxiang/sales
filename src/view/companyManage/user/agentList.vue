<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" :disabled="this.multipleSelection.length <= 0"
                    @click="deleteHandle">刪除
        </com-button>
        <com-button buttonType="grey" icon="el-icon-edit" :disabled="this.multipleSelection.length !== 1"
                    @click="modifyHandle">修改
        </com-button>
        <com-button buttonType="grey" icon="el-icon-remove-outline" :disabled="this.multipleSelection.length <= 0"
                    @click="disableHandle">禁用
        </com-button>
        <com-button buttonType="grey" icon="el-icon-setting" :disabled="this.multipleSelection.length !== 1"
                    @click="resetPassword">重置密码
        </com-button>
      </div>
      <div class="com-bar-right" style="float: right">
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
      </div>
      <div class="com-bar-right" style="float: right">
        <el-input v-model="name" placeholder="姓名" style="float: left">
          <template slot="prepend">姓名</template>
        </el-input>

      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          prop="id"
          reserve-selection=""
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="代理商号"
          prop="jobNo"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="mobilePhone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="organizationName"
          label="组织"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="departmentName"
          label="部门"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="角色"
        >
          <template slot-scope="scope">
            <span v-for="item in scope.row.roles"
                  :key="item.id"
            >{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="superiorName"
          label="直接上级"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="trainerName"
          label="部门培训师"
          width="160">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="assistantName"
          label="部门销售助理"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="sex"
          label="性别"
        >
        </el-table-column>
      </el-table>
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
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './addDialog'

  export default {
    props: {
      vaules: {
        default: '1',
      },
    },
    name: 'list',
    data () {
      return {
        loading: false,
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
        'pagesOptions',
      ]),
      ...mapState('user', [
        'userList',
        'userTotal',
      ]),
    },
    components: {
      comButton,
      addDialog,
    },
    props: ['params'],
    created () {
      var that = this
      that.$store = that.params.store//状态库赋值
      if (that.params.action == 'update') {
        that.$options.methods.getRoleDetail.bind(that)(that.params.id)
      }
    },
    methods: {
      closeDialog () {
        this.$vDialog.close()
      },
      add () {
        var that = this
        this.$vDialog.modal(addDialog, {
          title: '新增用户',
          width: 700,
          height: 500,
          params: {
            store: that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.searchHandle()
          },
        })
      },
      selsChange (sels) {
        this.sels = sels
        //alert(this.sels)
      },
      delGroup () {
        var ids = this.sels.map(item => item.id).join() // 获取所有选中行的id组成的字符串，以逗号分隔
        //alert(ids)
      },
      ...mapActions('user', [
        'ac_userList',
      ]),
      getuserList (page, pageSize, type) { // 获取列表数据
        let param = {
          page: page,
          pageSize: pageSize,
          type: 1,  // 查询员工
        }
        this.dataLoading = true
        API.user.userList(param, (res) => {
          this.ac_userList(res.data)
          setTimeout(() => {
            this.dataLoading = false
          }, 300)
        }, (mock) => {
          this.ac_userList(mock.data)
          this.dataLoading = false
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getuserList(this.currentPage - 1, this.pagesOptions.pageSize, this.userType)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getuserList(this.currentPage - 1, this.pagesOptions.pageSize, this.userType)
      },
      handleRouter (name, id) {
        this.$router.push({name: 'userDetail', params: {end: 'ME'}, query: {view: name, userId: id}})
      },
      addHandle () {
        this.addDialogOpen = true
        this.type = 'add'
      },
      modifyHandle () {
        var that = this;
        this.$vDialog.modal(addDialog,{
          title:'修改用户',
          width: 700,
          height: 500,
          params: {
            id: that.multipleSelection.map(item => item.id).join(),
            store:that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action:"update"
          },
          callback: function(data){
            that.searchHandle()
          }
        });
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
          API.user.userDelete(param, (res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
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
          API.user.userDisable(param, (res) => {
            this.$message({
              type: 'success',
              message: '用户禁用成功!',
            })
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
          API.user.userResetPassword(param, (res) => {
            this.$message({
              type: 'success',
              message: '成功重置密码!',
            })
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
      this.getuserList(this.currentPage - 1, this.pagesOptions.pageSize, this.userType)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
