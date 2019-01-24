<template>
  <div class="com-container"
       v-loading="loading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <template v-if="listType == '1'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteOrganization"
                      :disabled="selectedOrganizationIdList.length <= 0 && currentTreeNode == null">刪除组织
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="addOrganization">新增组织</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="updateOrganization"
                      :disabled="currentTreeNode == null">修改组织
          </com-button>
        </template>
        <template v-if="listType == '2'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteOrganization"
                      :disabled="selectedOrganizationIdList.length <= 0 && currentTreeNode == null">刪除部门
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="addOrganization">新增部门</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="updateOrganization"
                      :disabled="currentTreeNode == null">修改部门
          </com-button>
        </template>
        <template v-if="listType == '3'">
          <com-button buttonType="delete" icon="el-icon-delete" @click="deleteUser"
                      :disabled="selectedUserIdList.length <= 0">刪除用户
          </com-button>
          <com-button buttonType="add" icon="el-icon-plus" @click="addOrganizationUser">新增用户</com-button>
          <com-button buttonType="grey" icon="el-icon-edit" @click="updateOrganizationUser"
                      :disabled="selectedUserIdList.length <= 0">修改用户
          </com-button>
        </template>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-row :gutter="2">
        <el-col :span="6">
          <div class="role-head-con">组织机构</div>
          <el-tree :highlight-current="true" :expand-on-click-node="false" :default-expand-all="true"
                   :data="organizationList" :props="defaultProps" node-key="id" ref="organizationTree"
                   @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <el-tag size="mini" v-if="data.type==1">机构</el-tag><el-tag size="mini" type="warning" v-else>部门</el-tag>{{data.name}}
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <div class="role-view-con">
            <el-tabs :value="listType" @tab-click="handleTabClick">
              <el-tab-pane label="分子机构" name="1">
                <el-table
                  ref="dataTable"
                  border
                  tooltip-effect="dark"
                  :data="organizationAllList"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    fixed
                    type="selection"
                    align="center"
                    width="40">
                  </el-table-column>
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
                      <el-popover
                        ref="popover"
                        width="200"
                        trigger="click">
                        <el-button type="text" slot="reference" @click="getOrganizationUserList(scope.row.id)">
                          <template v-if="scope.row.admins.length > 0">
                            <span v-for="item in scope.row.admins" :key="item.id">{{item.name}}</span>
                          </template>
                          <template v-else>
                            无
                          </template>
                        </el-button>
                        <template>
                          <el-table
                            border
                            :data="userForList"
                            max-height="200">
                            <el-table-column
                              prop="name"
                              label="设置管理员">
                              <template slot-scope="adminScope">
                                <el-radio v-if="scope.row.admins.length>0" v-model="scope.row.admins[0].id"
                                          :label="adminScope.row.id"
                                          @change="handleAdminUserChange(scope.row.id,adminScope.row.id)">
                                  {{adminScope.row.name}}
                                </el-radio>
                                <el-radio v-else :label="adminScope.row.id"
                                          @change="handleAdminUserChange(scope.row.id,adminScope.row.id)">
                                  {{adminScope.row.name}}
                                </el-radio>
                              </template>
                            </el-table-column>
                          </el-table>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="部门" name="2">
                <el-table
                  ref="dataTable"
                  border
                  tooltip-effect="dark"
                  :data="organizationAllList"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    fixed
                    type="selection"
                    align="center"
                    width="40">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="部门"
                    show-overflow-tooltip
                    prop="name"
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
                    <template slot-scope="scope">
                      <el-popover
                        ref="popover"
                        width="200"
                        trigger="click">
                        <el-button type="text" slot="reference" @click="getOrganizationUserList(scope.row.id)">
                          <template v-if="scope.row.heads.length > 0">
                            <span v-for="item in scope.row.heads" :key="item.id">{{item.name}}</span>
                          </template>
                          <template v-else>
                            无
                          </template>
                        </el-button>
                        <template>
                          <el-table
                            border
                            :data="userForList"
                            max-height="200">
                            <el-table-column
                              prop="name"
                              label="设置负责人">
                              <template slot-scope="headsScope">
                                <el-radio v-if="scope.row.heads.length>0" v-model="scope.row.heads[0].id"
                                          :label="headsScope.row.id"
                                          @change="handleHeadUserChange(scope.row.id,headsScope.row.id)">
                                  {{headsScope.row.name}}
                                </el-radio>
                                <el-radio v-else :label="headsScope.row.id"
                                          @change="handleHeadUserChange(scope.row.id,headsScope.row.id)">
                                  {{headsScope.row.name}}
                                </el-radio>
                              </template>
                            </el-table-column>
                          </el-table>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="部门培训师"
                  >
                    <template slot-scope="scope">
                      <el-popover
                        ref="popover"
                        width="200"
                        trigger="click">
                        <el-button type="text" slot="reference" @click="getOrganizationUserList(scope.row.id)">
                          <template v-if="scope.row.trainers.length > 0">
                            <span v-for="item in scope.row.trainers" :key="item.id">{{item.name}}</span>
                          </template>
                          <template v-else>
                            无
                          </template>
                        </el-button>
                        <template>
                          <el-table
                            border
                            :data="userForList"
                            max-height="200">
                            <el-table-column
                              prop="name"
                              label="设置培训师">
                              <template slot-scope="trainersScope">
                                <el-radio v-if="scope.row.trainers.length>0" v-model="scope.row.trainers[0].id"
                                          :label="trainersScope.row.id"
                                          @change="handleTrainerUserChange(scope.row.id,trainersScope.row.id)">
                                  {{trainersScope.row.name}}
                                </el-radio>
                                <el-radio v-else :label="trainersScope.row.id"
                                          @change="handleTrainerUserChange(scope.row.id,trainersScope.row.id)">
                                  {{trainersScope.row.name}}
                                </el-radio>
                              </template>
                            </el-table-column>
                          </el-table>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
                    prop="mobilePhone"
                    label="部门销售助理"
                  >
                    <template slot-scope="scope">
                      <el-popover
                        ref="popover"
                        width="200"
                        trigger="click">
                        <el-button type="text" slot="reference" @click="getOrganizationUserList(scope.row.id)">
                          <template v-if="scope.row.assistants.length > 0">
                            <span v-for="item in scope.row.assistants" :key="item.id">{{item.name}}</span>
                          </template>
                          <template v-else>
                            无
                          </template>
                        </el-button>
                        <template>
                          <el-table
                            border
                            :data="userForList"
                            max-height="200">
                            <el-table-column
                              prop="name"
                              label="设置销售助理">
                              <template slot-scope="assistantsScope">
                                <el-radio v-if="scope.row.assistants.length>0" v-model="scope.row.assistants[0].id"
                                          :label="assistantsScope.row.id"
                                          @change="handleAssistantUserChange(scope.row.id,assistantsScope.row.id)">
                                  {{assistantsScope.row.name}}
                                </el-radio>
                                <el-radio v-else :label="assistantsScope.row.id"
                                          @change="handleAssistantUserChange(scope.row.id,assistantsScope.row.id)">
                                  {{assistantsScope.row.name}}
                                </el-radio>
                              </template>
                            </el-table-column>
                          </el-table>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="用户" name="3">
                <el-table
                  ref="dataTable"
                  border
                  :data="userList"
                  tooltip-effect="dark"
                  @selection-change="handleUserSelectionChange">
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
                    width="200"
                    show-overflow-tooltip
                    prop="name"
                  >
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
                    label="直接上级"
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
                    label="部门培训师"
                    width="160">
                    <template slot-scope="scope">
            <span v-for="item in scope.row.trainers"
                  :key="item.id"
            >{{item.name}}&nbsp;</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    align="center"
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
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import add from './add'
  import { Message } from 'element-ui'
  import addUserDialog from '../../user/addDialog'

  export default {
    name: 'roleList',
    data () {
      return {
        loading: false,
        organizationList: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        listType: '1',
        currentTreeNode: null,
        selectedOrganizationIdList: [],
        organizationAllList: [],
        userList: [],
        selectedUserIdList: [],
        userForList: [],
        adminUserBindId: '',
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
        that.$options.methods.getList.bind(that)()
        that.$options.methods.queryOrganizationList.bind(that)(0, 1)
        if (that.$refs.dataTable) {
          that.$refs.dataTable.clearSelection()
        }
      },
      getList () {
        var that = this
        that.selectedOrganizationIdList = []
        that.currentTreeNode = null
        this.listType = '1'
        this.loading = true
        API.organization.queryList({}, (res) => {
          that.loading = false
          if (res.status) {
            that.organizationList = res.data
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
      addOrganization () {
        var that = this
        this.$vDialog.modal(add, {
          title: '新增组织',
          width: 700,
          height: 400,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
            currentNode: that.currentTreeNode,
          },
          callback: function (data) {
            that.$options.methods.init.bind(that)()
          },
          cancelCallback: function () {
            that.$options.methods.init.bind(that)()
          },
        })
      },
      splitName (arrayName) {
        if (arrayName && arrayName.length > 0) {
          return Array.from(arrayName, (x) => x.name).join('、')
        }
        return '无'
      },
      updateOrganization () {
        var that = this
        if (that.currentTreeNode == null) {
          Message({
            message: '请先选择一个机构或部门',
            type: 'warning',
          })
          return
        }
        this.$vDialog.modal(add, {
          title: '修改组织',
          width: 700,
          height: 300,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'update',
            currentNode: that.currentTreeNode,
          },
          callback: function (data) {
            that.$options.methods.init.bind(that)()
          },
          cancelCallback: function () {
            that.$options.methods.init.bind(that)()
          },
        })
      },
      deleteOrganization () {
        var that = this
        if (that.selectedOrganizationIdList.length <= 0 && that.currentTreeNode == null) {
          Message({
            message: '请先选择一个机构或部门',
            type: 'warning',
          })
          return
        }
        this.$confirm('是否确认删除?', '提示', {
          type: 'warning',
        }).then(() => {
          var ids = ''
          if (that.selectedOrganizationIdList.length > 0) {
            ids = that.selectedOrganizationIdList.join(',')
          } else {
            ids = that.currentTreeNode.id
          }
          that.loading = true
          API.organization.delete({ids: ids}, function (res) {
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
        that.currentTreeNode = that.$refs.organizationTree.getCurrentNode()
        that.selectedOrganizationIdList = []
        that.listType = that.currentTreeNode.type.toString()
        that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode.id, that.currentTreeNode.type)
      },
      handleTabClick (tab) {
        var that = this
        that.listType = tab.name
        if (that.listType !== '3') {
          that.currentTreeNode = that.$refs.organizationTree.getCurrentNode()
          that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0,
            that.listType)
        } else {
          that.$options.methods.queryUserList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0)
        }
      },
      queryOrganizationList (pid, type) {
        var that = this
        that.organizationAllList = []
        that.loading = true
        API.organization.queryAllList({pid: pid, type: type}, (res) => {
          that.loading = false
          if (res.status) {
            that.organizationAllList = res.data
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
      handleUserSelectionChange (val) {
        var that = this
        if (val.length > 0) {
          that.selectedUserIdList = Array.from(val, (n) => n.id)
        } else {
          that.selectedUserIdList = []
        }
      },
      handleSelectionChange (val) {
        var that = this
        that.currentTreeNode = null
        if (val.length > 0) {
          that.selectedOrganizationIdList = Array.from(val, (n) => n.id)
        } else {
          that.selectedOrganizationIdList = []
        }
      },
      queryUserList (departmentId) {
        var that = this
        that.userList = []
        that.loading = true
        API.organization.queryUserList({id: departmentId}, (res) => {
          that.loading = false
          if (res.status) {
            that.userList = res.data
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
        // 清楚表格所有选择
        if (that.$refs.dataTable) {
          that.$refs.dataTable.clearSelection()
        }
      },
      deleteUser () {
        var that = this
        if (that.selectedUserIdList.length <= 0) {
          Message({
            message: '请先选择用户',
            type: 'warning',
          })
          return
        }
        this.$confirm('是否确认删除?', '提示', {
          type: 'warning',
        }).then(() => {
          that.loading = true
          API.user.userDelete({ids: that.selectedUserIdList.join(',')}, function (res) {
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
      getOrganizationUserList (id) {
        var that = this
        // 查询管理员列表
        API.organization.queryUserForList({id: id}, (res) => {
          if (res.status) {
            that.userForList = res.data
            that.userForList.unshift({id: null, name: '无'})
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        })
      },
      handleAdminUserChange (organizationId, adminUserId) {
        var that = this
        that.loading = true
        API.organization.setAdmin({id: organizationId, userIds: adminUserId}, function (res) {
          that.loading = false
          if (res.status) {
            Message({
              message: '设置成功！',
              type: 'success',
            })
            that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0,
              that.listType)
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
      },
      handleHeadUserChange (organizationId, userId) {
        var that = this
        that.loading = true
        API.organization.setHead({id: organizationId, userIds: userId}, function (res) {
          that.loading = false
          if (res.status) {
            Message({
              message: '设置成功！',
              type: 'success',
            })
            that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0,
              that.listType)
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
      },
      handleTrainerUserChange (organizationId, userId) {
        var that = this
        that.loading = true
        API.organization.setTrainer({id: organizationId, userIds: userId}, function (res) {
          that.loading = false
          if (res.status) {
            Message({
              message: '设置成功！',
              type: 'success',
            })
            that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0,
              that.listType)
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
      },
      handleAssistantUserChange (organizationId, userId) {
        var that = this
        that.loading = true
        API.organization.setAssistant({id: organizationId, userIds: userId}, function (res) {
          that.loading = false
          if (res.status) {
            Message({
              message: '设置成功！',
              type: 'success',
            })
            that.$options.methods.queryOrganizationList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0,
              that.listType)
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
      },
      addOrganizationUser () {
        var that = this
        that.$vDialog.modal(addUserDialog, {
          title: '新增用户',
          width: 700,
          height: 500,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            action: 'add',
          },
          callback: function (data) {
            that.$options.methods.queryUserList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0)
          },
        })
      },
      updateOrganizationUser () {
        var that = this
        if (that.selectedUserIdList.length > 1) {
          Message({
            message: '请选择单个修改，不支持批量！',
            type: 'warning',
          })
          return
        }
        this.$vDialog.modal(addUserDialog, {
          title: '修改用户',
          width: 700,
          height: 500,
          params: {
            store: that.$store, // 弹窗组件如果需要用到vuex，必须传值过去赋值
            id: that.selectedUserIdList.join(','),
            action: 'update',
          },
          callback: function (data) {
            that.$options.methods.queryUserList.bind(that)(that.currentTreeNode ? that.currentTreeNode.id : 0)
          },
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
