<template>
    <div class="com-container">
      <table class="detail-table">
        <tr>
          <td rowspan="4" class="td-center">订单基本信息</td>
        </tr>
        <tr>
          <td class="td-title">订单号</td>
          <td>{{detail.orderId}}</td>
          <td class="td-title">订单状态</td>
          <td>
            <span v-if="detail.orderState === 1">待服务</span>
            <span v-if="detail.orderState === 2">服务中</span>
            <span v-if="detail.orderState === 3">已完成</span>
            <span v-if="detail.orderState === 4">已退单</span>
          </td>
          <td class="td-title">服务类型</td>
          <td>
            <!--<span v-if="detail.serviceItemConfigModel">-->
              <!--<span v-for="item in serviceType" :key="item.type"-->
                    <!--v-if="item.type === detail.serviceItemConfigModel.serviceType">-->
                    <!--{{item.value}}-->
                  <!--</span>-->
            <!--</span>-->
            {{detail.serviceType}}
          </td>
        </tr>
        <tr>
          <td class="td-title">下单时间</td>
          <td>{{detail.orderTime && $moment(detail.orderTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
          <td class="td-title">服务客户</td>
          <td>{{detail.serviceCustomerName}}</td>
          <td class="td-title">联系人</td>
          <td>{{detail.contactName}}[{{detail.contactPhone}}]</td>
        </tr>
        <tr>
          <td class="td-title">购买商品</td>
          <td>{{detail.goodsName}}</td>
          <td class="td-title">商品规格</td>
          <td>{{detail.specificationName}}</td>
          <td class="td-title">购买数量</td>
          <td>{{detail.goodsNum}}</td>
        </tr>
        <tr>
          <td rowspan="5" class="td-center">订单发票信息</td>
        </tr>
        <tr>
          <td class="td-title">订单金额</td>
          <td>{{detail.orderAmount}}</td>
          <td class="td-title">订单优惠</td>
          <td>{{detail.orderReduction}}</td>
          <td class="td-title">订单实付</td>
          <td>{{detail.orderPayment}}</td>
        </tr>
        <tr>
          <td class="td-title">发票类型</td>
          <td>
            <span v-if="detail.invoiceType == 'ALIPAY'">支付宝</span>
            <span v-if="detail.invoiceType == 'WECHAT'">微信</span>
            <span v-if="detail.invoiceType == 'LINE_DOWN'">线下支付</span>
            <span v-if="detail.invoiceType == 'ONEPAY'">一网通</span>
            <span v-if="detail.invoiceType == 'UNIONPAY'">银联</span>
          </td>
          <td class="td-title">开票单位</td>
          <td>{{detail.invoiceUnit}}</td>
          <td class="td-title">纳税识别号</td>
          <td>{{detail.taxIdentificationNum}}</td>
        </tr>
        <tr>
          <td class="td-title">开户行信息</td>
          <td>{{detail.bankAddress}}</td>
          <td class="td-title">银行账号</td>
          <td>{{detail.bankAccount}}</td>
          <td class="td-title"></td>
          <td></td>
        </tr>
        <tr>
          <td class="td-title">发票邮寄地址</td>
          <td colspan="5">{{detail.invoiceMailAddress}}</td>
        </tr>
        <tr>
          <td class="td-center" rowspan="3">订单其他信息</td>
        </tr>
        <tr>
          <td class="td-title">预约服务时间</td>
          <td colspan="5">
            {{detail.reservationTime && $moment(detail.reservationTime).format('YYYY-MM-DD HH:mm:ss')}}
          </td>
        </tr>
        <tr>
          <td class="td-title">订单备注</td>
          <td colspan="5">{{detail.remark}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
  import API from '../../../../utils/api'
  export default {
    name: 'detailDialog',
    data () {
      return {
        detail: {
          serviceItemConfigModel: {},
        },
        serviceType: [ // 7种服务类型
          {
            type: 1,
            value: '外勤服务',
          }, {
            type: 2,
            value: '财务记账',
          }, {
            type: 3,
            value: '财务内控',
          }, {
            type: 4,
            value: '纳税申报务',
          }, {
            type: 5,
            value: '税收风控',
          }, {
            type: 6,
            value: '其他计次服务',
          }, {
            type: 7,
            value: '其他计时服务',
          },
        ],
      }
    },
    props: ['params'],
    methods: {
      getDetailByOrderId (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.detail = da.data
          if (!this.detail.serviceItemConfigModel) {
            this.detail.serviceItemConfigModel = JSON.parse(da.data.itemConfig)
          }
        })
      },
    },
    created () {
      this.getDetailByOrderId(this.params.orderId)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
