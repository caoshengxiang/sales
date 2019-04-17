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
          <h3>{{detail.goodsName}}
            <span class="com-d-tap" v-if="detail.state === 2">投诉调查</span>
            <span class="com-d-tap" v-if="detail.state === 3">投诉处理</span>
            <span class="com-d-tap" v-if="detail.state === 4">投诉回访</span>
            <span class="com-d-tap" v-if="detail.state === 5">升级调查</span>
            <span class="com-d-tap" v-if="detail.state === 6">升级处理</span>
          </h3>
          <p>
            <span class="com-d-item">投诉状态:
              <span v-if="detail.state === 1">待派单</span>
              <span v-if="detail.state === 2">跟进中</span>
              <span v-if="detail.state === 3">待处理</span>
              <span v-if="detail.state === 4">待回访</span>
              <span v-if="detail.state === 5">升级跟进中</span>
              <span v-if="detail.state === 6">升级待处理</span>
              <span v-if="detail.state === 7">已完成</span>
            </span>
            <span class="com-d-item">客户名称: <span>{{detail.customerName}}</span></span>
            <span class="com-d-item">添加日期: <span>{{detail.created && $moment(detail.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="stepClickHandle(2)" v-if="detail.state === 2">投诉调查</li>
          <li @click="stepClickHandle(3)" v-if="detail.state === 3">投诉处理</li>
          <li @click="stepClickHandle(4)" v-if="detail.state === 4">投诉回访</li>
          <li @click="stepClickHandle(5)" v-if="detail.state === 5">升级调查</li>
          <li @click="stepClickHandle(6)" v-if="detail.state === 6">升级处理</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step" style="margin-top: 20px">
          <el-steps :active="detail.state - 1" align-center>
            <!--<el-step @click.native="stepClickHandle(item)" v-for="(item, index) in complaintState" :key="index"-->
            <!--:title="item.value"></el-step>-->
            <el-step title="跟进中"></el-step>
            <el-step title="待处理"></el-step>
            <el-step title="待回访"></el-step>
            <el-step title="升级跟进中"></el-step>
            <el-step title="升级待处理"></el-step>
            <el-step title="已完成"></el-step>
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
            <td>{{detail.num}}</td>
            <td class="td-title">首次投诉日期</td>
            <td>{{detail.created && $moment(detail.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="td-title">客服坐席</td>
            <td>{{detail.cusServiceName}}</td>
          </tr>
          <tr>
            <td class="td-title">客户名称</td>
            <td>{{detail.customerName}}</td>
            <td class="td-title">联系人</td>
            <td>{{detail.contactName}}</td>
            <td class="td-title">联系方式</td>
            <td>{{detail.contactPhone}}</td>
          </tr>
          <tr>
            <td class="td-title">订单编号</td>
            <td>{{detail.orderId}}</td>
            <td class="td-title">服务商品</td>
            <td>{{detail.goodsName}}</td>
            <td class="td-title">服务状态</td>
            <td>
              <span v-if="detail.orderState === 1">待服务</span>
              <span v-if="detail.orderState === 2">服务中</span>
              <span v-if="detail.orderState === 3">已完成</span>
              <span v-if="detail.orderState === 4">已退单</span>
            </td>
          </tr>
          <tr>
            <td class="td-title">被投诉人员</td>
            <td>{{detail.managerName}}</td>
            <td class="td-title">管家号</td>
            <td>{{detail.managerNo}}</td>
            <td class="td-title">投诉跟踪人</td>
            <td>{{detail.cusName}}</td>
          </tr>
          <tr>
            <td class="td-title">被投诉对象</td>
            <td colspan="6">
              <span v-if="detail.code === 1">商务管家</span>
              <span v-if="detail.code === 2">服务管家</span>
              <span v-if="detail.code === 3">平台</span>
            </td>
          </tr>
          <tr>
            <td class="td-title">首次投诉内容</td>
            <td colspan="6">{{detail.content}}</td>
          </tr>
          <tr>
            <td class="td-title" rowspan="2">首次调查结果</td>
            <td rowspan="2">
              <span v-if="detail.checkResultModel.duty == true">有责任</span>
              <span v-if="detail.checkResultModel.duty == false">无责任</span>
            </td>
            <td colspan="4">
              <ul class="duty-ul">
                <!--<li type="square"-->
                    <!--v-if="detail.checkResultModel"-->
                    <!--v-for="(item, index) in detail.checkResultModel.dutyTypes"-->
                    <!--:key="index"-->
                <!--&gt;{{item.codeName}}</li>-->
                <li type="square"
                    v-if="detail.checkResultModel"
                    v-for="(item, index) in detail.checkResultModel.dutyTypes"
                    :key="index"
                >{{item.codeName}}</li>
                <li type="square" v-if="detail.checkResultModel.serviceContent">服务内容</li>
                <li type="square" v-if="detail.checkResultModel.servicePrice">服务价格</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <ul class="duty-ul">
                <li type="square" v-if="detail.checkResultModel.other">其他</li>
              </ul>
              <span style="padding-left: 10px;" v-if="detail.checkResultModel.other">{{detail.checkResultModel.otherContent}}</span>
            </td>
          </tr>
          <tr>
            <td class="td-title">首次处理方案</td>
            <td colspan="5">{{detail.handlePlan}}</td>
          </tr>
          <tr>
            <td class="td-title">首次处理结果</td>
            <td colspan="5">{{detail.handleResult}}</td>
          </tr>
          <tr>
            <td class="td-title">首次处理结果回访</td>
            <td colspan="5">
              <span v-if="detail.handleVisitModel.state == 1">满意</span>
              <span v-if="detail.handleVisitModel.state == 2">不满意</span>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              {{detail.handleVisitModel.content}}
            </td>
          </tr>
          <tr v-if="detail.state >= 5">
            <td class="td-title">升级投诉单号</td>
            <td>{{detail.upgradeNum}}</td>
            <td class="td-title">升级投诉日期</td>
            <td>{{detail.upgradeTime && $moment(detail.upgradeTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td class="td-title">升级投诉跟踪人</td>
            <td>{{detail.upgradeCusName}}</td>
          </tr>
          <tr v-if="detail.state >= 5">
            <td class="td-title">升级投诉处理方案</td>
            <td colspan="5">{{detail.upgradePlan}}</td>
          </tr>
          <tr v-if="detail.state >= 5">
            <td class="td-title">处理结果</td>
            <td colspan="5">{{detail.upgradeReuslt}}</td>
          </tr>
          <tr v-if="detail.state >= 5">
            <td class="td-title">投诉处理</td>
            <td colspan="5">
              <ul class="duty-ul">
                <li type="square" v-if="detail.complaintReusltModel.cancelReward">取消该订单的服务奖励</li>
                <li type="square" v-if="detail.complaintReusltModel.stopCooperation">取消合作</li>
                <li type="square" v-if="detail.complaintReusltModel.other">
                  其他（{{detail.complaintReusltModel.otherDesc}}）
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import handleDialog from './handleDialog'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        complaintState: [
          {value: '跟进中'},
          {value: '待处理'},
          {value: '待回访'},
          {value: '升级跟进中'},
          {value: '升级待处理'},
          {value: '已完成'},
        ],
        detail: {
          checkResultModel: {},
          complaintReusltModel: {},
          handleVisitModel: {},
        },
      }
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle (type) {
        // console.log(type)
        let typeName = ['投诉调查', '投诉处理', '投诉回访', '升级调查', '升级处理']
        this.$vDialog.modal(handleDialog, {
          title: typeName[type - 2],
          width: 1000,
          height: 660,
          params: {
            type: type, // 2-6 投诉调查，投诉处理，投诉回访，升级调查，升级处理
            id: this.detail.id,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getDetail()
            }
          },
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceComplaint.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          if (da.data.checkResult) {
            this.detail.checkResultModel = JSON.parse(da.data.checkResult)
            // console.log(JSON.parse(da.data.checkResult))
          } else {
            this.detail.checkResultModel = {}
          }
          if (!da.data.complaintReusltModel) {
            this.detail.complaintReusltModel = {}
          }
          if (!da.data.handleVisitModel) {
            this.detail.handleVisitModel = {}
          }
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
    },
    created () {
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .duty-ul {
    li {
      float: left;
      margin-left: 20px;
    }
  }
</style>
