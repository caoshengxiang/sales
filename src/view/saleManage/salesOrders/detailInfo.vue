<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>销售订单</el-breadcrumb-item>
        <el-breadcrumb-item>销售订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../assets/placeholder.jpg" alt="">
        <div class="com-info-text">
          <h3>成都凡特塞科技有限公司</h3>
          <!--todo 按钮连接-->
          <p>
            <span class="com-d-item">客户所有人: <span>凡特塞科技</span></span>
            <span class="com-d-item">所属公海: <span>成都公海</span></span>
            <span class="com-d-item">创建时间: <span>2018.02.13 12:20:20</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <el-radio-group v-model="tapOption">
          <el-radio-button class="btn-width" label="move">APP下单</el-radio-button>
          <el-radio-button class="btn-width" label="move">修改</el-radio-button>
          <el-radio-button class="btn-width" label="move">删除</el-radio-button>
          <!--todo 调整按钮样式-->
        </el-radio-group>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="销售订单资料信息" name="detail">
            <p class="table-title">销售订单基本信息</p>
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

            <p class="table-title">销售订单其他信息</p>
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
          <!---->
          <el-tab-pane label="销售订单回款信息" name="related">

            <!--<div class="related-btn-group">-->
              <!--<com-button buttonType="theme">联系人(2)</com-button>-->
              <!--<com-button buttonType="grey">销售需求(2)</com-button>-->
              <!--<com-button buttonType="grey">销售订单(2)</com-button>-->
            <!--</div>-->

            <p class="table-title">
              回款应收合计 6000.00 / 未收款合计 3000.00
              <!--<a class="more">更多》</a>-->
              <!--<a class="table-add"><i class="el-icon-plus"></i></a>-->
            </p>
            <table class="detail-table related-table">
              <tr>
                <!--todo 7 个 th-->
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>

            <p class="table-title">
              回款关联人信息
              <!--<a class="more">更多》</a>-->
              <!--<a class="table-add"><i class="el-icon-plus"></i>新增跟单记录</a>-->
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
                <th class="td-title">所在公海</th>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
              <tr>
                <td>客户创建时间</td>
                <td>2018.11.12 12:12:12</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>创建人</td>
                <td>test</td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <div class="team-title">
          <span class="title-text">团队成员</span>
        </div>
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
        <!--todo 操作-->
      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../components/button/comButton'

  export default {
    name: 'detailInfo',
    data () {
      return {
        tapOption: '',
        activeViewName: '',
      }
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
        this.$router.push({name: 'salesOrdersDetail', query: {view: tab.name}})
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
