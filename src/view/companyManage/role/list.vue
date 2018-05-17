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
        <com-button buttonType="delete" icon="el-icon-delete">刪除
        </com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="testClick">新增</com-button>
        <com-button buttonType="grey" icon="el-icon-edit">修改
        </com-button>
        <com-button buttonType="grey" icon="el-icon-remove-outline">保存
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
            class="el-menu-vertical-demo">
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
                  tooltip-effect="dark"
                  style="width: 100%">
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
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import add from './add'

  export default {
    name: 'roleList',
    data () {
      return {
        dataLoading: false
      }
    },
    components: {
      comButton
    },
    methods: {
      getRoleList () {
        this.dataLoading = true
        API.roleList({name:""}, (res) => {
          this.dataLoading = false;
        }, (mock) => {
          this.dataLoading = false;
        })
      },
      testClick(){
        this.$vDialog.modal(add,{
          title:'新增角色',
          width:700,
          height:300,
          params: {
            id: '123456'
          },
          callback: function(data){
            alert("弹窗关闭，这里可以执行新增后的刷新方法");
          }
        });
      }
    },
    created () {
      var that = this;
      that.$options.methods.getRoleList.bind(that)();
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
