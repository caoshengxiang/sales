<template>
  <div class="sale-home">
    <div class="welcome">欢迎进入服务商管理系统！</div>
    <div class="latest-announcement">
      <p class="com-title">最新公告</p>
      <p>
        在新的监管模式下，新旧监管主体将重新定位其监管角色，金融机构和市场亦将随之而变。届时，中国运行达15年的“一行三会”分业模式将从历史舞台谢幕。触发这一历史转折的是，资产规模高达百万亿元的中国金融业，近年来突破性的成长、创新、巨变与
        挑战。随后中国金融业在完成国有金融机构改革、利率市场化、全流通股改等一系列市场化改革后，综合经营渐成 势。2006年的“十一五”规划则奠定了我国金融业综合经营的起点。 <br>
        一位研究金融监管体制改革的经济学家向《财经》记者表示，中国金融监管改革源于现有的混业经营，当控股公司成为金融公司主要的存在形式，监管重叠和监管真空以及监管套利相继出现时，分业监管便已不再适应当前金融业的发展。此后，金融监管改革
        呼声渐起，“改革并完善适应现代金融市场发展的金融监管框架”，在2015年10月召开的十八届五中全会上被正式提出。<br>
        去年7月召开的全国金融工作会议提出，要加强金融监管协调、补齐监管短板，设立国务院金融稳定发展委员会，强化人民银行宏观审慎管理和系统性风险防范职责。11月，金稳委成立，办公室设在央行。</p>
    </div>
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <funnel-chart></funnel-chart>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <bar-chart></bar-chart>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <scatter-chart></scatter-chart>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
          <div class="col-box">
            <order-chart></order-chart>
          </div>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">任务审批待办列表</p>
            <ul class="list">
              <li>服务商基本信息完善</li>
              <li>服务商服务内容提交审核</li>
              <li>服务订单派发（30）</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <p class="com-title">销售机会列表</p>
            <ul class="list">
              <li>全部销售机会</li>
              <li>我开发的销售机会</li>
              <li>即将签单销售机会</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">最新消息</p>
            <ul class="list">
              <li>关于调整服务商服务内容通知</li>
              <li>您的服务内容调整申请已经通过审核</li>
              <li>您的服务内容调整申请已经通过审核</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import funnelChart from './funnelChart'
  import barChart from './barChart'
  import scatterChart from './scatterChart'
  import orderChart from './orderChart'

  export default {
    name: 'saleHome',
    data () {
      return {
      }
    },
    components: {
      funnelChart,
      barChart,
      scatterChart,
      orderChart,
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";

  .welcome {
    font-size: 22px;
    color: $color-1-active;
    margin-left: $page-base-padding;
    margin-top: $page-base-padding;
  }

  .latest-announcement {
    border-bottom: 6px solid $part-color;
    padding: $page-base-padding;
  }

  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 320px;
      }
    }
    .lr-part {
      border-left: 6px solid $part-color;
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 362px;
    }
  }
  .list {
    li {
      color: #333333;
      padding: 20px;
      border-bottom: 1px dashed #ccc;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .link {
    padding: 20px;
    text-align: center;
    .link-all {
      color: $color-1-active;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>
