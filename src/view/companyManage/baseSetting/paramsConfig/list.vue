<template>
  <div class="com-container"
       v-loading="loading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>参数配置管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" :disabled="this.multipleSelection.length <= 0"
                    @click="deleteRole">刪除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="add">新增</com-button>
        <com-button buttonType="grey" icon="el-icon-edit" :disabled="this.multipleSelection.length === 1?false:true"
                    @click="update">修改
        </com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">业务参数名称</div>
          <el-menu
            :default-active="roleDefaultIndex"
            @select="selectRole">
            <el-menu-item
              v-for="item in roleList"
              :key="item.id"
              :index="item.id.toString()">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div class="role-head-con">
            描述：<span style="padding-right: 10px;">{{des}}</span>
          </div>
          <div class="role-view-con">
            <el-table
              ref="multipleTable"
              border
              :data="businessSystemList"
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
                align="left"
                show-overflow-tooltip
                label="参数名称"
                prop="codeName"
              >
              </el-table-column>
              <!--   <el-table-column
                   align="left"
                   show-overflow-tooltip
                   label="描述"
                   prop="codeDesc"
                 >
                 </el-table-column>-->
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import add from './add'
  import { Message } from 'element-ui'

  export default {
    name: 'roleList',
    data () {
      return {
        loading: false,
        roleList: [
          {id: 2, name: '客户级别'},
          {id: 3, name: '客户行业'},
          {id: 6, name: '管家类型'},
          {id: 7, name: '意见类型'},
          {id: 8, name: '投诉类型'},
          ],
        roleDefaultIndex: '1',
        roleDetail: {},
        multipleSelection: [],
        businessSystemList: [],
        des: '客户级别',
        selectid: 0,
      }
    },
    components: {
      comButton,
    },
    created () {
      var that = this
      that.roleDefaultIndex = 2
      that.getCodeConfig(that.roleDefaultIndex)
    },
    methods: {
      handleSelectionChange (val) {
        // alert(val.length)
        this.multipleSelection = val
        console.log('x选中的')
        console.log(val)
      },
      add () {
        var that = this
        this.$vDialog.modal(add, {
          title: '新增' + that.des,
          width: 700,
          height: 400,
          params: {
            type: that.roleDefaultIndex,
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.getCodeConfig(that.roleDefaultIndex)
          },
        })
      },
      selectRole (index) {
        var that = this
        that.des = that.roleList.find((n) => n.id === parseInt(index)).name
        that.$options.methods.getCodeConfig.bind(that)(index)
      },
      getCodeConfig (id) {
        var that = this
        that.multipleSelection = []
        that.roleDefaultIndex = id.toString()
        that.selectid = id
        that.loading = true
        API.baseSetting.getCodeConfig({type: that.roleDefaultIndex}, function (res) {
          that.loading = false
          if (res.status) {
            that.businessSystemList = res.data
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
            id: that.multipleSelection.map(item => item.id).join(),
            name: that.multipleSelection.map(item => item.codeName).join(),
            type: that.roleDefaultIndex,
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
          },
          callback: function (data) {
            that.$refs.multipleTable.clearSelection()
            that.getCodeConfig(that.roleDefaultIndex)
          },
        })
      },
      deleteRole () {
        this.$confirm('确认删除选中记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var id = this.multipleSelection.map(item => item.id).join() // 当前选中的所有ID
          let param = {
            ids: id,
          }

          API.baseSetting.delete(param, (res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.selectRole(this.selectid)
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
      save () {
        var that = this
        that.loading = true
        API.role.update(that.roleDetail, function (resData) {
          that.loading = false
          if (resData.status) {
            Message({
              message: '保存成功！',
              type: 'success',
            })
            that.$options.methods.getRoleList.bind(that)()
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
  @import "../../../../styles/common";

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
