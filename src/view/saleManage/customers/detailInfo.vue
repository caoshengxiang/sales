<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>客户</el-breadcrumb-item>
        <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/placeholder.jpg" alt="">
        <div class="com-info-text">
          <h3>成都凡特塞科技有限公司</h3>
          <p>
            <span class="com-d-item">客户所有人: <span>凡特塞科技</span></span>
            <span class="com-d-item">所属公海: <span>成都公海</span></span>
            <span class="com-d-item">创建时间: <span>2018.02.13 12:20:20</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <el-radio-group v-model="tapOption">
          <el-radio-button class="btn-width" label="edit">编辑</el-radio-button>
          <el-radio-button class="btn-width" label="back">退回公海</el-radio-button>
          <el-radio-button class="btn-width" label="move">转移</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--详细-->
    <div class="com-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="客户资料信息" name="detail">
            <p class="table-title">客户资料信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">公司名称</td>
                <td>成都凡特塞科技有限公司</td>
                <td class="td-title">营业执照</td>
                <td>455655213213123</td>
                <td class="td-title">客户级别</td>
                <td>重要客户</td>
              </tr>
              <tr>
                <td class="td-title">客户简称</td>
                <td>凡特塞科技</td>
                <td class="td-title">客户行业</td>
                <td>互联网</td>
                <td class="td-title">客户来源</td>
                <td>自拓</td>
              </tr>
              <tr>
                <td class="td-title">所在地区</td>
                <td>四川省 成都市 高新区</td>
                <td class="td-title">公司网站</td>
                <td>www.djksdj.com</td>
                <td class="td-title">联系电话</td>
                <td>12135678912</td>
              </tr>
              <tr>
                <td class="td-title">联系地址</td>
                <td colspan="5">京东卡积分等级ask京东卡时间</td>
              </tr>
              <tr>
                <td class="td-title">主营业务</td>
                <td colspan="5">暂未填写主营业务</td>
              </tr>
            </table>

            <p class="table-title">客户其他信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">所在公海</td>
                <td>成都公海</td>
                <td class="td-title">客户来源</td>
                <td>公司资源</td>
                <td class="td-title">客户状态</td>
                <td>自建</td>
              </tr>
              <tr>
                <td class="td-title">客户创建时间</td>
                <td colspan="3">2018.11.12 12:12:12</td>
                <td class="td-title">创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td class="td-title">最新修改时间</td>
                <td colspan="3">2018.11.12 12:12:12</td>
                <td class="td-title">跟进人</td>
                <td>test</td>
              </tr>
              <tr>
                <td class="td-title">最新活动时间</td>
                <td colspan="5">2018.11.12 12:12:12</td>
              </tr>
              <tr>
                <td class="td-title">主营业务</td>
                <td colspan="5">暂未填写主营业务</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="客户相关" name="related">客户相关</el-tab-pane>
        </el-tabs>
      </div>
      <div class="detail-right com-box-padding">
        <el-tabs v-model="activeTeamMembers" @tab-click="handleClick">
          <el-tab-pane label="团队成员" name="list">团队成员</el-tab-pane>
          <el-tab-pane label="团队成员" name="a">团队成员</el-tab-pane>
          <el-tab-pane label="团队成员" name="b">团队成员</el-tab-pane>
          <el-tab-pane label="团队成员" name="c">团队成员</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailInfo',
    data () {
      return {
        tapOption: '',
        activeName: 'detail',
        activeTeamMembers: 'list'
      }
    },
    methods: {
      handleTabsClick (tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

</style>
