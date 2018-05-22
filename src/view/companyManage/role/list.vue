<template>
  <div class="com-container"
       v-loading="loading"
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
        <com-button buttonType="add" icon="el-icon-plus" @click="add">新增</com-button>
        <com-button buttonType="grey" icon="el-icon-edit" @click="update">修改
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
            描述：<span style="padding-right: 10px;">{{roleDetail.name}}</span>
            职能：<span>{{splitName(roleDetail.bilities)}}</span>
          </div>
          <div class="role-view-con">
            <el-tabs value="first">
              <el-tab-pane label="销售系统" name="first">
                <el-table
                  ref="multipleTable"
                  border
                  tooltip-effect="dark">
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
              <el-tab-pane label="服务系统" name="second">
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
              <el-tab-pane label="平台后台系统" name="three">
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
        roleList:[],
        roleDefaultIndex:"1",
        roleDetail:{}
      }
    },
    components: {
      comButton
    },
    created () {
      var that = this;
      that.$options.methods.getRoleList.bind(that)();
    },
    methods: {
      getRoleList () {
        var that = this;
        this.loading = true
        API.role.queryList({name:""}, (res) => {
          that.loading = false;
          if(res.status){
            that.roleList = res.data;
            if (that.roleList.length > 0) {
              that.roleDefaultIndex = that.roleList[0].id.toString();
              that.$options.methods.getRoleDetail.bind(that)(that.roleDefaultIndex);
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
      add(){
        var that = this;
        this.$vDialog.modal(add,{
          title:'新增角色',
          width:700,
          height:400,
          params: {
            store:that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action:"add"
          },
          callback: function(data){
            that.$options.methods.getRoleList.bind(that)();
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
      update(){
        var that = this;
        var that = this;
        this.$vDialog.modal(add,{
          title:'修改角色',
          width:700,
          height:400,
          params: {
            id: that.roleDefaultIndex,
            store:that.$store, //弹窗组件如果需要用到vuex，必须传值过去赋值
            action:"update"
          },
          callback: function(data){
            that.$options.methods.getRoleList.bind(that)();
          }
        });
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
