<template>
  <div class="com-dialog-container">
    <div class="percent">
      <div class="order-no">订单编号：</div>
      <div class="step-box">
        <el-steps :active="orderDetail.orderState + 1" finish-status="success">
          <el-step title="预下单"></el-step>
          <el-step title="待支付"></el-step>
          <el-step title="待服务"></el-step>
          <el-step title="服务中"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div>
      <div class="order-info">
        <img src="../../../assets/icon/company.png" alt="">
        <div class="text">
          <p>{{orderDetail.productName}}</p>
          <p>{{orderDetail.unit}} <span style="margin-left: 50px">x{{orderDetail.quantity}}</span></p>
        </div>
      </div>
      <div class="sum">
        <span class="left">合计金额：￥{{orderDetail.totalAmount}}</span>
        <div class="right">
          <!--<span>优惠50元</span>-->
          <span class="repayment">回款：￥{{orderDetail.refundAmount}}</span></div>
      </div>
      <div class="el-table-box">
        <el-table
          :data="orderDetail.refundRecordList"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="费用名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="netReceipts"
            label="支付金额(元)"
            align="center">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            align="center"
            label="支付方式">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="支付状态">
          </el-table-column>
        </el-table>
      </div>
      <div class="detail-box">
        <div class="detail-item">
          <p>服务企业：</p>
          <p>预约时间：{{orderDetail.createDate&&$moment(orderDetail.createDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
          <p>订单备注：</p>
        </div>
        <!--<div class="detail-item">-->
          <!--<p>评价星级：-->
            <!--<el-rate-->
              <!--style="display: inline-block"-->
              <!--v-model="rateNum"-->
              <!--disabled-->
              <!--show-score-->
              <!--text-color="#ff9900"-->
              <!--score-template="{value}">-->
            <!--</el-rate>-->
          <!--</p>-->
          <!--<p>评价内容：</p>-->
        <!--</div>-->
        <div class="detail-item">
          <div class="left">
            <p>下单时间：{{orderDetail.createDate&&$moment(orderDetail.createDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>确认时间：{{orderDetail.ensureDate&&$moment(orderDetail.ensureDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>服务结束：{{orderDetail.serviceStartDate&&$moment(orderDetail.serviceStartDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
          <div class="right">
            <p>支付时间：{{orderDetail.payDate&&$moment(orderDetail.payDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>服务开始：{{orderDetail.serviceEndDate&&$moment(orderDetail.serviceEndDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
            <p>订单完成：{{orderDetail.finishDate&&$moment(orderDetail.finishDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'orderInfoDialog',
    data () {
      return {
        orderDetail: null,
        rateNum: 3.5,
      }
    },
    props: ['params'],
    methods: {},
    created () {
      this.orderDetail = this.params.orderDetail
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }

  .order-no {
    color: #39C189;
    font-size: 12px;
  }

  .step-box {
    margin: 30px;
  }

  .order-info {
    img {
      height: 56px;
    }
    .text {
      display: inline-block;
      position: relative;
      top: -8px;
      left: 20px;
      p {
        line-height: 28px;
        color: #4F5F6F;
        &:last-child {
          color: #728395;
        }
      }
    }
  }

  .sum {
    margin-top: 10px;
    margin-bottom: 30px;
    color: #4F5F6F;
    .left {

    }
    .right {
      float: right;
      .repayment {
        color: #00A7FE;
        margin-left: 20px;
      }
    }
  }

  .el-table-box {
    margin: 20px 0;
  }

  .detail-box {
    background-color: #FCFCFC;
    font-size: 12px;
    .detail-item {
      padding: 20px 14px;
      border-bottom: 1px solid #F0F3F6;
      p {
        margin: 5px 0;
      }
      &:last-child {
        display: flex;
        .left {
          width: 50%;
        }
        .right {
          width: 50%;
        }
      }

    }
  }
</style>
