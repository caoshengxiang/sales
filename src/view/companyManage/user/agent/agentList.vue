<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商组织</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <!--  <com-button buttonType="delete" icon="el-icon-delete" :disabled="this.multipleSelection.length <= 0"
                      @click="deleteHandle">刪除
          </com-button>-->
        <com-button buttonType="grey" icon="el-icon-edit" :disabled="this.multipleSelection.length !== 1"
                    @click="modifyHandle">修改
        </com-button>
        <!--<com-button buttonType="grey" icon="el-icon-remove-outline" :disabled="this.multipleSelection.length <= 0"-->
        <!--@click="disableHandle">禁用-->
        <!--</com-button>-->
        <com-button buttonType="grey" icon="el-icon-remove-outline"
                    :disabled="this.multipleSelection.length <= 0 || disableUserHandle"
                    @click="disableHandle(0)">禁用
        </com-button>
        <com-button buttonType="grey" icon="el-icon-check"
                    :disabled="this.multipleSelection.length <= 0 || enableUserHandle"
                    @click="disableHandle(1)">启用
        </com-button>
        <com-button buttonType="grey" icon="el-icon-setting" :disabled="this.multipleSelection.length !== 1"
                    @click="resetPassword">重置密码
        </com-button>
      </div>
      <div class="com-bar-right" style="float: right">
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
      <div class="com-bar-right" style="float: right">
        <el-select v-model.number="form.organizationId" placeholder="请选择代理商组织">
          <el-option
            v-for="item in allorganization"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!--    <el-cascader
              placeholder="请选择代理商部门"
              :change-on-select="true"
              :options="alldepartments"
              v-model="selectedOptions"
              :props="props"
              @change="selecteddptHandleChange"
            >
            </el-cascader>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="userList"
        :max-height='posheight'
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          prop="id"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="name"
          width="140"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable="custom"
          label="代理商号"
          width="120"
          prop="jobNo"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="身份类型"
          width="100"
          prop="identityTypeRemark"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="mobilePhone"
          label="手机号"
          width="140"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="注册来源"
          width="140"
        >
		<template slot-scope='scope'>
			<span>{{sourceStateszx[scope.row.agentSource]}}</span>
		</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="wx"
          label="微信号"
          width="140"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="organizationName"
          label="组织"
          width="140"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="departmentName"
          label="部门"
          width="140"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="roleName"
          label="角色"
          sortable="custom"
          width="140"
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
          prop="commissionSum"
          label="佣金收益"
          width="140"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="directName"
          label="直接培育人"
          width="160"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="indirectName"
          label="间接培育人"
          width="160"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="directNum"
          label="直接代理商数"
					sortable="custom"
          width="160"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="validDirectNum"
          label="直接培育的有效代理商数"
          sortable="custom"
          width="180"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="directDemandNum"
          label="需求数"
          sortable="custom"
          width="100"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="directName"
          label="直接上级"
          width="140"
        >
          <template slot-scope="scope">
            <span v-for="item in scope.row.heads"
                  :key="item.id"
            >{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          label="部门培训师"
          width="140">
          <template slot-scope="scope">
            <span v-for="item in scope.row.trainers"
                  :key="item.id"
            >{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop=""
          width="140"
          label="部门销售助理"
        >
          <template slot-scope="scope">
            <span v-for="item in scope.row.assistants"
                  :key="item.id"
            >{{item.name}}&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="sex"
          label="性别"
          width="80"
        >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
        align="center"
        prop="birthday"
        label="出生日期"
        width="100"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{scope.row.birthday && $moment(scope.row.birthday).format('YYYY-MM-DD')}}
        </template>
      </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="created"
          label="注册日期"
          width="100"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="status"
          sortable="custom"
          :formatter="fmtNumColumn"
          label="状态"
          width="80"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="managerName"
					width='100'
          label="代理商维护者"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="subordinateCompanyName"
					width='160'
          label="所属公司"
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
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from '../addDialog'
  import advancedSearch from '../advancedSearch'
  import { underscoreName } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        sortObj: null, // 排序
        advancedSearch: {}, // 高级搜索
        loading: false,
        dataLoading: true,
        addDialogOpen: false, // 新增弹窗
        moveDialogOpen: false, // 转移弹窗
        type: 'add', // 新增弹窗
        multipleSelection: [],
        userType: 0, // 客户选项
        currentPage: 1, // 当前页
        sels: [], // 选中的值显示
        selectedOptions: [],
        allorganization: [],
        alldepartments: [],
        props: {
          children: 'children',
          value: 'id',
          label: 'name',
        },
        form: { // 添加用户表单
          departmentId: '',
          organizationId: '',
        },
        disabled: true,
        userTotal: 0,
        userList: null,
        disableUserHandle: false,
        enableUserHandle: false,
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'userourceType',
		'sourceState',
		'sourceStateszx',
        'usertate',
        'pagesOptions',
      ]),
      ...mapState('user', []),
    },
    watch: {
      multipleSelection (va) {
        this.enableUserHandle = false
        this.disableUserHandle = false
        va.forEach(item => {
          console.log(item.status, item)
          if (item.status === 1) { // 有效
            this.enableUserHandle = true
          } else if (item.status === 3) { // 禁用
            this.disableUserHandle = true
          }
        })
      },

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
    components: {
      comButton,
      addDialog,
      advancedSearch,
    },
    props: ['params'],
    created () {
      this.getuserList(this.currentPage - 1, this.pagesOptions.pageSize, this.userType)
      let params = {
        page: 1,
        pageSize: 999,
        pid: 8,
        type: 1,
      }
      API.organization.queryAllList(params, (res) => {
        this.allorganization = res.data
        // this.selectedOptionsHandleChange()
      }, (mock) => {
        this.alldepartments = mock.data
        this.dataLoading = false
      })
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
        this.getuserList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
			sourceState: this.sourceState,
            demandSource: this.demandSource,
            type: 1,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getuserList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
          },
        })
      },
      fmtNumColumn (row, column, cellValue) {
        if (cellValue === 1) {
          return '有效'
        } else if (cellValue === -1) {
          return '无效'
        } else if (cellValue === 2) {
          return '内置'
        } else if (cellValue === 3) {
          return '禁用'
        }
      },
      selecteddptHandleChange (value) {
        this.form.departmentId = value[value.length - 1] // 取当前选中的部门
      },
      selectedOptionsHandleChange () {
        var that = this
        // this.form.organizationId =value[value.length -1] // 取当前选中的组织
        let depparams = {
          page: 1,
          pageSize: 999,
        }
        depparams.id = that.form.organizationId
        depparams.type = 2 // 查询出部门
        API.organization.queryList(depparams, (res) => {
          that.alldepartments = res.data
					console.log(11111111111111111, that.alldepartments)
          if (that.params.id > 0) {
            var tempid = that.form.departmentId
            var loopDo = function (list, id) {
              for (var i = 0; i < list.length; i++) {
                var item = list[i]
                if (item.id === id) {
                  that.selectedOptions.push(item.id)
                  if (item.pid > 0) {
                    loopDo(that.alldepartments, item.pid)
                  }
                } else {
                  loopDo(item.children, id)
                }
              }
            }

            loopDo(that.alldepartments, tempid)
            that.selectedOptions.reverse()
          }
        }, (mock) => {
        })
      },
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
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.searchHandle()
          },
        })
      },
      selsChange (sels) {
        this.sels = sels
        // alert(this.sels)
      },
      delGroup () {
        // eslint-disable-next-line
        var ids = this.sels.map(item => item.id).join() // 获取所有选中行的id组成的字符串，以逗号分隔
        // alert(ids)
      },
      ...mapActions('user', []),
      getuserList (page, pageSize, type) { // 获取列表数据
        var that = this
        let param = {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          type: 2, // 查询员工
          departmentId: that.form.departmentId,
          organizationId: that.form.organizationId,
        }
        that.dataLoading = true
        API.user.userList(Object.assign({}, param, that.sortObj, that.advancedSearch), (res) => {
          that.userList = res.data.content
          that.userTotal = res.data.totalElements
          setTimeout(() => {
            that.dataLoading = false
          }, 300)
        }, (mock) => {
          that.ac_userList(mock.data)
          that.dataLoading = false
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
        let _url = this.$router.resolve({name: 'userDetail', params: {end: 'ME'}, query: {view: name, userId: id}});
				window.open(_url.href, '_blank')
      },
      addHandle () {
        this.addDialogOpen = true
        this.type = 'add'
      },
      modifyHandle () {
        var that = this
        this.$vDialog.modal(addDialog, {
          title: '修改用户',
          width: 700,
          height: 500,
          params: {
            id: that.multipleSelection.map(item => item.id).join(),
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
          },
          callback: function (data) {
            that.searchHandle()
            that.$refs.multipleTable.clearSelection()
          },
        })
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
      disableHandle (type) {
        if (this.disableUserHandle && this.enableUserHandle) {
          if (type === 0) {
            this.$message.info('选项中包含禁用用户！')
          } else if (type === 1) {
            this.$message.info('选项中包含有效用户！')
          }
          return
        }
        this.$confirm(`确定${type === 0 ? '禁用' : '启用'}当前选中所有用户, 是否继续?`, '提示', {
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
            this.currentPage = 1
            this.getuserList()
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
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
