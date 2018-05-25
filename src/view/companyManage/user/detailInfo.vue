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
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" >
          <el-tab-pane label="用户资料信息" name="detail">
            <p class="table-title">用户资料信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">姓名</td>
                <td>{{userDetail.name}}</td>
                <td class="td-title">工号</td>
                <td>{{userDetail.jobNo}}</td>
                <td class="td-title">联系电话</td>
                <td>{{userDetail.mobilePhone}}</td>
              <!--  <td rowspan="6">
                  <div class="head">
                  <img src="../../../assets/icon/headDefault.png" alt="">
                </div>
                </td>-->
              </tr>
              <tr>
                <td class="td-title">身份证编号</td>
                <td>{{userDetail.idCard}}</td>
                <td class="td-title">性别</td>
                <td>{{userDetail.sex}}</td>
                <td class="td-title">年龄</td>
                <td>{{userDetail.age}}</td>
              </tr>
              <tr>
                <td class="td-title">出生日期</td>
                <td>{{userDetail.birthday}}</td>
              <td class="td-title">邮箱</td>
              <td>{{userDetail.mail}}</td>
              <td class="td-title">QQ</td>
              <td>{{userDetail.qq}}</td>
            </tr>
              <tr>
                <td class="td-title">微信号</td>
                <td>{{userDetail.wx}}</td>
                <td class="td-title">联系地址</td>
                <td colspan="3">{{ userDetail.provinceName }}
                  {{ userDetail.cityName }}
                  {{ userDetail.areaName }}
                  {{ userDetail.address}}
                </td>
              </tr>
            </table>
              <p class="table-title">组织信息</p>
              <table class="detail-table">
                <tr>
                  <td class="td-title">组织</td>
                  <td>{{userDetail.organizationName}}</td>
                  <td class="td-title">部门</td>
                  <td>{{userDetail.departmentName}}</td>
                  <td class="td-title">角色</td>
                  <td ><label v-for="temp in userDetail.roles">{{temp.name}}\</label></td>
                </tr>
              <tr>
                <td class="td-title">直接上级</td>
                <td>{{userDetail.superiorName}}</td>
                <td class="td-title">培训师</td>
                <td>{{userDetail.trainerName}}</td>
                <td class="td-title">销售助理</td>
                <td>{{userDetail.assistantName}}</td>
              </tr>
              <tr>
                <td class="td-title">代理商号</td>
                <td>{{userDetail.agentNo}}</td>
                <td class="td-title">主营业务</td>
                <td colspan="3">{{userDetail.business || '暂未填写主营业务'}}</td>
              </tr>
              <tr>
              </tr>
            </table>

            <p class="table-title">资金信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">开户账号</td>
                <td>{{userDetail.bankAccount}}</td>
                <td class="td-title">可以提现金额</td>
                <td>{{userDetail.availableCash}}</td>
                <td class="td-title">冻结金额</td>
                <td>{{userDetail.frozenCash}}</td>
              </tr>
              <tr>
                <td class="td-title">开户名称</td>
                <td>{{userDetail.bankUsername}}</td>
                <td class="td-title">开户地点</td>
                <td  colspan="3">{{userDetail.bankAccount}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import { mapState, mapActions } from 'vuex'


  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        tapOption: '',
        activeViewName: '',
      }
    },
    computed: {
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
    },
    methods: {
      ...mapActions('user', [
        'ac_userDetail',
      ]),
      getuserDetail () {
        this.dataLoading = true
        API.user.userDetail({id: this.$route.query.userId}, (data) => {
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
