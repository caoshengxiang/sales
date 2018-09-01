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
          <h3>todo <span class="com-d-tap">升级投诉</span></h3>
          <p>
            <span class="com-d-item">投诉状态: <span> todo</span></span>
            <span class="com-d-item">客户名称: <span>todo</span></span>
            <span class="com-d-item">添加日期: <span>todo、todo</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('delete')">投诉调查</li>
          <li @click="operateOptions('delete')">投诉处理</li>
          <li @click="operateOptions('delete')">投诉回访</li>
          <li @click="operateOptions('delete')">升级调查</li>
          <li @click="operateOptions('delete')">升级处理</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <el-steps :active="1" align-center>
            <el-step @click.native="stepClickHandle(item)" v-for="(item, index) in complaintState" :key="index"
                     :title="item.value" v-if="index !== 0"></el-step>
          </el-steps>
        </div>
      </div>

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <!--<p class="table-title"></p>-->
        <table class="detail-table">
          <tr>
            <td class="td-title">投诉单号</td>
            <td>todo</td>
            <td class="td-title">首次投诉日期</td>
            <td>todo</td>
            <td class="td-title">客服坐席</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">客户名称</td>
            <td>todo</td>
            <td class="td-title">联系人</td>
            <td>todo</td>
            <td class="td-title">联系方式</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">订单编号</td>
            <td>todo</td>
            <td class="td-title">服务商品</td>
            <td>todo</td>
            <td class="td-title">服务状态</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">被投诉对象</td>
            <td>todo</td>
            <td class="td-title">管家号</td>
            <td>todo</td>
            <td class="td-title">被投跟踪人</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title" rowspan="2">首次调查结果</td>
            <td rowspan="2">有责任</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td class="td-title">首次处理方案</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">首次处理结果</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">首次处理结果回访</td>
            <td colspan="5">满意 XXXXXX</td>
          </tr>
          <tr>
            <td class="td-title">升级投诉单号</td>
            <td>todo</td>
            <td class="td-title">升级投诉日期</td>
            <td>todo</td>
            <td class="td-title">升级投诉跟踪人</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">升级投诉处理方案</td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td class="td-title">处理结果</td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td class="td-title">投诉处理</td>
            <td colspan="5"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        complaintState: [
          {value: '跟进中'},
          {value: '待处理'},
          {value: '待回访'},
          {value: '升级更进中'},
          {value: '升级待处理'},
          {value: '已完成'},
        ]
      }
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
