<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>todo <span class="com-d-tap">平台直属/平台控股子公司</span></h3>
          <p>
            <span class="com-d-item">服务地区: <span> todo</span></span>
            <span class="com-d-item">联系电话: <span>todo</span></span>
            <span class="com-d-item">服务类目: <span>todo、todo</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('delete')">派单</li>
          <li @click="operateOptions('delete')">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                回访<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">客户主动退单订单回访</el-dropdown-item>
                <el-dropdown-item command="b">回款异常订单回访</el-dropdown-item>
                <el-dropdown-item command="c">A类产品续费异常订单回访</el-dropdown-item>
                <el-dropdown-item command="d">非记账托管业务首次沟通订单回访</el-dropdown-item>
                <el-dropdown-item command="e">外勤首次上门回访</el-dropdown-item>
                <el-dropdown-item command="f">2-3星评价回访</el-dropdown-item>
                <el-dropdown-item command="g">未评价订单回访</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="服务订单信息" name="order">
            <!--<p class="table-title"></p>-->
            <table class="detail-table">
              <tr>
                <td class="td-title">回访单号</td>
                <td></td>
                <td class="td-title">回访日期</td>
                <td></td>
                <td class="td-title">回访坐席</td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">客户名称</td>
                <td></td>
                <td class="td-title">联系人</td>
                <td></td>
                <td class="td-title">联系方式</td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">订单编号</td>
                <td></td>
                <td class="td-title">服务商品</td>
                <td></td>
                <td class="td-title">服务状态</td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">原评价星级</td>
                <td></td>
                <td class="td-title">回访评价</td>
                <td></td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">客户评价原因</td>
                <td colspan="5"></td>
              </tr>
              <tr>
                <td class="td-title">客户其他反馈</td>
                <td colspan="5"></td>
              </tr>
            </table>

            <!--<p class="table-title"></p>-->
            <!--<table class="detail-table">-->

            <!--</table>-->
          </el-tab-pane>
          <el-tab-pane label="订单相关信息" name="related">
            <p class="table-title">服务客户</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">服务客户名称</td>
                <td class="td-title">统一信用码</td>
                <td class="td-title">注册资本金</td>
                <td class="td-title">所属行业</td>
                <td class="td-title">企业联系人及电话</td>
              </tr>
            </table>

            <p class="table-title">订单信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">订单下单时间</td>
              </tr>
            </table>

            <p class="table-title">服务派单 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">订单下单时间</td>
              </tr>
            </table>

            <p class="table-title">历史订单 <span>（2）</span></p>
            <table class="detail-table">
              <tr>
                <td class="td-title">订单号</td>
                <td class="td-title">订单状态</td>
                <td class="td-title">商品名称</td>
                <td class="td-title">服务派单时间</td>
                <td class="td-title">服务完成时间</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="订单加工信息" name="operate">
            <table class="detail-table">
              <tr>
                <td style="height: 50px;" class="td-center">外勤服务[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="首次电话沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="首次上门沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="录入客户资料" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="装订凭证" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务记账[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="客户资料审核" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="客户票据审核" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="记账日常告知" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="出具财务报表" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务申报[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="税前沟通" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税申报" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税异常提醒" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">财务内控[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="财务内控分析" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="财务内控构建指导" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">税收风控[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="增值税发票风险管理指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收优惠政策辅导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收问题提醒" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收分控方案设计" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="纳税信用等级维护指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="财税专家“一对一”咨询" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税务危机应对参与" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="税收策划指导" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">金融服务[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="融资需求分析" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="融资对接指导" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="政府扶持资金规话" status="1"></icon-text>
                </td>
              </tr>
              <tr>
                <td style="height: 50px;" class="td-center">其他单项服务（产品名）[张三]</td>
                <td colspan="5">
                  <icon-text icon="el-icon-picture" text="开始服务" status="1"></icon-text>
                  <icon-text icon="el-icon-picture" text="完成服务" status="1"></icon-text>
                </td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import iconText from '../../../../components/iconText/iconText'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'order',
      }
    },
    components: {
      iconText,
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
      handleTabsClick () {},
      handleCommand (command) {
        this.$message('click on item ' + command)
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
