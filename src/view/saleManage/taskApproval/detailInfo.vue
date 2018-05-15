<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>工作任务</el-breadcrumb-item>
        <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <table class="detail-table">
        <tr>
          <td class="td-title">公司名称</td>
          <td>成都凡特塞科技有限公司</td>
          <td class="td-title">营业执照</td>
          <td>455655213213123</td>
          <td class="td-title">客户级别</td>
          <td>重要客户</td>
          <td class="td-title">客户级别</td>
          <td>重要客户</td>
        </tr>
        <tr>
          <td class="td-title">公司名称</td>
          <td>成都凡特塞科技有限公司</td>
          <td class="td-title">营业执照</td>
          <td>455655213213123</td>
          <td class="td-title">客户级别</td>
          <td colspan="3">重要客户</td>
        </tr>
        <tr>
          <td class="td-title">公司名称</td>
          <td colspan="7">
            <el-button>审核通过</el-button>
            <el-button>审核拒绝</el-button>
          </td>
        </tr>
      </table>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
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
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <!--<div class="team-title">-->
          <!--<span class="title-text">团队成员</span>-->
        <!--</div>-->
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>张珊珊</h4>
              <p>123456748912</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
              <!--<span class="post-tag-2">销售员</span>-->
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>张珊珊</h4>
              <p>123456748912</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
              <!--<span class="post-tag-2">销售员</span>-->
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img src="../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>张珊珊</h4>
              <p>123456748912</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
              <!--<span class="post-tag-2">销售员</span>-->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'detailInfo',
    data () {
      return {}
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
    },
    methods: {
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'customersDetail', params: {end: 'FE'}, query: {view: tab.name}})
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .detail-table {
    width: 100%;
  }
</style>
