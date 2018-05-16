<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" >
          <el-tab-pane label="用户资料信息" name="detail">
            <p class="table-title">用户资料信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">用户名称</td>
                <td>{{userDetail.name}}</td>
                <td class="td-title">身份证编号</td>
                <td>{{userDetail.idCard}}</td>
                <td class="td-title">年龄</td>
                <td>{{userDetail.age}}</td>
              </tr>
              <tr>
                <td class="td-title">用户头像</td>
                <td>{{userDetail.avatar}}</td>
                <td class="td-title">开户账号</td>
                <td>{{userDetail.bankAccount}}</td>
                <td class="td-title">bankDeposit</td>
                <td>{{userDetail.bankAccount}}</td>
              </tr>
              <tr>
              <td class="td-title">邮箱</td>
              <td>{{userDetail.mail}}</td>
              <td class="td-title">联系电话</td>
              <td>{{userDetail.mobilePhone}}</td>
              <td class="td-title">QQ</td>
              <td>{{userDetail.qq}}</td>
            </tr>
              <tr>
                <td class="td-title">性别</td>
                <td>{{userDetail.sex}}</td>
                <td class="td-title">微信号</td>
                <td>{{userDetail.wx}}</td>
                <td class="td-title">代理商号</td>
                <td>{{userDetail.agentNo}}</td>
              </tr>
              <tr>
                <td class="td-title">销售助理</td>
                <td>{{userDetail.assistantName}}</td>
                <td class="td-title">可以提现金额</td>
                <td>{{userDetail.availableCash}}</td>
                <td class="td-title">冻结金额</td>
                <td>{{userDetail.frozenCash}}</td>
              </tr>
              <tr>
                <td class="td-title">工号</td>
                <td>{{userDetail.jobNo}}</td>
                <td class="td-title">组织</td>
                <td>{{userDetail.organizationName}}</td>
                <td class="td-title">部门</td>
                <td>{{userDetail.departmentName}}</td>
              </tr>
              <tr>
                <td class="td-title">直接上级</td>
                <td>{{userDetail.superiorName}}</td>
                <td class="td-title">培训师</td>
                <td>{{userDetail.trainerName}}</td>
                <td class="td-title">类型</td>
                <td>{{userDetail.type}}</td>
              </tr>
              <tr>
                <td class="td-title">开户名称</td>
                <td>{{userDetail.bankUsername}}</td>
                <td class="td-title">生日</td>
                <td>{{userDetail.birthday}}</td>
                <td class="td-title">所在地区</td>
                <td>{{ userDetail.provinceName }}
                  {{ userDetail.cityName }}
                  {{ userDetail.areaName }}
                </td>
              </tr>
              <tr>
                <td class="td-title">角色</td>
                <td >{{userDetail.roles}}</td>
                <td class="td-title">联系地址</td>
                <td >{{userDetail.address}}</td>
                <td class="td-title">主营业务</td>
                <!--<td colspan="5">暂未填写主营业务{{userDetail.business}}</td>-->
                <td colspan="5">{{userDetail.business || '暂未填写主营业务'}}</td>
              </tr>
              <tr>

              </tr>
            </table>

            <!--<p class="table-title">客户其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">所在公海</td>
                <td>{{userDetail.seaName}}</td>
                <td class="td-title">客户来源</td>
                <td>
                  <span v-for="item in userSourceType" :key="item.type"
                        v-if="item.type === userDetail.source">{{item.value}}</span>
                </td>
                <td class="td-title">客户状态</td>
                <td>
                   <span v-for="item in userState" :key="item.type"
                         v-if="item.type === userDetail.state">{{item.value}}</span>
                </td>
              </tr>
              <tr>
                <td class="td-title">客户创建时间</td>
                <td colspan="3">{{userDetail.created}}</td>
                <td class="td-title">创建人</td>
                <td>{{userDetail.creatorName}}</td>
              </tr>
              <tr>
                <td class="td-title">最新修改时间</td>
                <td colspan="3">{{userDetail.modified}}</td>
                <td class="td-title">修改人</td>
                <td>{{userDetail.modifierName}}</td>
              </tr>
              <tr>
                <td class="td-title">最新活动时间</td>
                <td colspan="3">{{userDetail.activeTime}}</td>
                <td class="td-title">跟进人</td>
                <td>{{userDetail.followerName}}</td>
              </tr>
            </table>-->
          </el-tab-pane>
          <!---->
        </el-tabs>
      </div>
      <!--团队成员-->
    </div>
    <!-- -->
    <!-- -->
    <!--编辑弹窗-->
    <add-dialog type="edit" :userDetail="userDetail" :addDialogOpen="addDialogOpen"
                @hasAddDialogOpen="addDialogOpen = false"></add-dialog>
    <!-- -->
    <!-- -->
    <!--转移客户弹窗-->
    <move-dialog :moveDialogOpen="moveDialogOpen" @hasMoveDialogOpen="moveDialogOpen = false"></move-dialog>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './addDialog'
  import moveDialog from './moveDialog'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        addDialogOpen: false, // 新增弹窗
        moveDialogOpen: false, // 转移弹窗
        tapOption: '',
        activeViewName: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'userSourceType',
        'userState',
      ]),
      ...mapState('user', [
        'userDetail',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      addDialog,
      moveDialog,
    },
    methods: {
      ...mapActions('user', [
        'ac_userDetail',
      ]),
      handleTabsClick (tab, event) {
        // console.log(tab.name)
      },
      getuserDetail () {
        this.dataLoading = true
        API.userDetail({id: this.$route.query.userId}, (data) => {
          this.ac_userDetail(data.data)
          this.dataLoading = false
        }, (mock) => {
          this.ac_userDetail(mock.data)
          this.dataLoading = false
        })
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getuserDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
