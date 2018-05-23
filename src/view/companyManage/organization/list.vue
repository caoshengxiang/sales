<template>
  <div class="com-container"
       v-loading="loading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <template v-if="listType == '1'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteOrganization">刪除组织
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="addOrganization">新增组织</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="updateOrganization">修改组织
          </com-button>
        </template>
        <template v-if="listType == '2'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteOrganization">刪除部门
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="addOrganization">新增部门</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="updateOrganization">修改部门
          </com-button>
        </template>
        <template v-if="listType == '3'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteRole">刪除用户
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="add">新增用户</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="update">修改用户
          </com-button>
        </template>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">组织机构</div>
          <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="organizationList" :props="defaultProps" node-key="id" ref="organizationTree" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="18">
          <div class="role-view-con">
            <el-tabs :value="listType" @tab-click="handleTabClick">
              <el-tab-pane label="分子机构" name="1">
                <el-table
                  border
                  tooltip-effect="dark"
                  :data="organizationAllList">
                  <el-table-column
                    align="center"
                    label="组织"
                    show-overflow-tooltip
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    label="职能"
                    prop="jobNo"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="管理员"
                  >
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.admins" :key="item.id">{{item.name}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="部门" name="2">
                <el-table
                  ref="multipleTable"
                  border
                  tooltip-effect="dark">
                  <el-table-column
                    align="center"
                    label="部门"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    label="组织"
                    prop="jobNo"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="职能"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="负责人"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="部门培训师"
                  >
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="部门销售助理"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="用户" name="3">
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
                    label="工号"
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
              </el-tab-pane>
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
  import { Message } from 'element-ui'

  export default {
    name: 'roleList',
    data () {
      return {
        loading: false,
        organizationList:[],
        roleDetail:{},
        businessSystemList:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        listType:"1",
        currentTreeNode:null,
        selectedOrganizationIdList:[],
        organizationAllList:[]
      }
    },
    components: {
      comButton
    },
    created () {
      var that = this;
      that.$options.methods.getList.bind(that)();
      that.$options.methods.queryOrganizationList.bind(that)(0,1);
    },
    methods: {
      getList () {
        var that = this;
        that.selectedOrganizationIdList = [];
        that.currentTreeNode = null;
        this.listType = "1";
        this.loading = true;
        API.organization.queryList({}, (res) => {
          that.loading = false;
          if(res.status){
            that.organizationList = res.data;
            if (that.organizationList.length > 0) {
              //that.roleDefaultIndex = that.roleList[0].id.toString();
              //that.$options.methods.getRoleDetail.bind(that)(that.roleDefaultIndex);
            }
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }

        }, (mock) => {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error'
          });
        })
      },
      addOrganization(){
        var that = this;
        this.$vDialog.modal(add,{
          title:'新增组织',
          width:700,
          height:400,
          params: {
            store:that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action:"add",
            currentNode:that.currentTreeNode
          },
          callback: function(data){
            that.$options.methods.getList.bind(that)();
          },
          cancelCallback:function () {
            that.$options.methods.getList.bind(that)();
          }
        });
      },
      selectRole(index){
        var that = this;
        that.$options.methods.getRoleDetail.bind(that)(index);
      },
      getRoleDetail(id){
        var that = this;
        that.roleDefaultIndex = id.toString();
        that.loading = true;
        API.role.getDetail({id:id},function (res) {
          that.loading = false;
          if(res.status){
            that.roleDetail = res.data;
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }
        },function () {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error'
          });
        });
      },
      splitName(arrayName){
        if (arrayName && arrayName.length > 0) {
          return Array.from(arrayName,(x) => x.name).join("、");
        }
        return "无";
      },
      updateOrganization(){
        var that = this;
        if (that.currentTreeNode == null) {
          Message({
            message: '请先选择一个机构或部门',
            type: 'warning'
          });
          return;
        }
        this.$vDialog.modal(add,{
          title:'修改组织',
          width:700,
          height:300,
          params: {
            store:that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action:"update",
            currentNode:that.currentTreeNode
          },
          callback: function(data){
            that.$options.methods.getList.bind(that)();
          },
          cancelCallback:function () {
            that.$options.methods.getList.bind(that)();
          }
        });
      },
      getBusinessSystemList(){
        var that = this;
        API.role.getBusinessSystemList(function (res) {
          if(res.status){
            that.businessSystemList = res.data;
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }
        },function () {
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error'
          });
        });
      },
      deleteOrganization(){
        var that = this;
        if (that.selectedOrganizationIdList.length <= 0) {
          Message({
            message: '请先选择一个机构或部门',
            type: 'warning'
          });
          return;
        }
        this.$confirm('是否确认删除?', '提示', {
          type: 'warning'
        }).then(() => {
          that.loading = true;
          API.organization.delete({ids:that.selectedOrganizationIdList.join(',')},function (res) {
          that.loading = false;
          if(res.status){
            Message({
              message: '删除成功！',
              type: 'success'
            });
            that.$options.methods.getList.bind(that)();
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }
        },function () {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error'
          });
        });
        });
      },
      handleNodeClick(){
        var that = this;
        that.currentTreeNode = that.$refs.organizationTree.getCurrentNode();
        that.selectedOrganizationIdList = [];
        that.selectedOrganizationIdList.push(that.currentTreeNode.id);
        that.listType = that.currentTreeNode.type.toString();
        that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode.id,that.currentTreeNode.type);
      },
      handleTabClick(tab){
        this.listType = tab.name;
      },
      queryOrganizationList(pid,type){
        var that = this;
        that.organizationAllList = [];
        that.loading = true;
        API.organization.queryAllList({pid:pid,type:type}, (res) => {
          that.loading = false;
          if(res.status){
            that.organizationAllList = res.data;
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }

        }, (mock) => {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error'
          });
        })
      }
    }
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

  .el-menu-item{
    $select_bg: #F4F6F8;
    &:hover{
      background-color:#fbfbfb;
    }
    &:focus{
      background-color:$select_bg;
    }
    &.is-active{
      font-weight: 600;
      color: #426585;
      background-color:$select_bg;
    }
  }
</style>
