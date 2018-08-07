<template>
  <div class="com-container"
       v-loading="loading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="add(null)">新增顶级</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-tree
        :data="list"
        lazy
        accordion
        :props="defaultProps"
        node-key="id"
        ref="areaTree"
        @node-click="handleNodeClick"
        :load="loadNode"
        :highlight-current="true"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          {{data.codeName}}
          <el-button type="text" icon="el-icon-plus" size="mini" @click="add(node)"></el-button>
          <el-button type="text" icon="el-icon-edit" size="mini" @click="update(node)"></el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteInfo([data.id])"></el-button>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { Message } from 'element-ui'
  import add from './add'

  export default {
    name: 'roleList',
    data () {
      return {
        loading: false,
        list: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        currentTreeNode: null,
      }
    },
    components: {
      comButton,
    },
    created () {
      var that = this
      that.$options.methods.init.bind(that)()
    },
    methods: {
      init () {
        var that = this
        this.loading = true
        API.baseSetting.getCodeConfig({type: 5,pCode: 0}, function (res) {
          that.loading = false
          if (res.status) {
            that.list = res.data
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
      add (node) {
        var that = this
        if (node) {
          node = node.data
        }
        that.$vDialog.modal(add, {
          title: '新增客户源',
          width: 700,
          height: 400,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
            currentNode: node,
          },
          callback: function (data) {
            that.$options.methods.init.bind(that)()
          },
          cancelCallback: function () {
            that.$options.methods.init.bind(that)()
          },
        })
      },
      update (node) {
        var that = this
        that.$vDialog.modal(add, {
          title: '修改客户源',
          width: 700,
          height: 300,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
            currentNode: node.data,
          },
          callback: function (data) {
            that.$options.methods.init.bind(that)()
          },
          cancelCallback: function () {
            that.$options.methods.init.bind(that)()
          },
        })
      },
      deleteInfo (ids) {
        var that = this
        this.$confirm('是否确认删除?', '提示', {
          type: 'warning',
        }).then(() => {
          that.loading = true
          API.baseSetting.delete({ids: ids.join(',')}, function (res) {
            that.loading = false
            if (res.status) {
              Message({
                message: '删除成功！',
                type: 'success',
              })
              that.$options.methods.init.bind(that)()
            } else {
              Message({
                message: res.error.message,
                type: 'error',
              })
            }
          }, function () {
            that.loading = false
            Message({
              message: '系统繁忙，请稍后再试！',
              type: 'error',
            })
          })
        }).catch(() => {})
      },
      handleNodeClick () {
        var that = this
        that.currentTreeNode = that.$refs.areaTree.getCurrentNode()
      },
      loadNode (node, resolve) {
        var that = this
        if (node.data.length <= 0) {
          return
        }
        this.loading = true
        API.baseSetting.getCodeConfig({pCode: node.data.id,type:5}, (res) => {
          that.loading = false
          if (res.status) {
            resolve(res.data)
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
